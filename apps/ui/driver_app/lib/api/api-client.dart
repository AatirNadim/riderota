import 'package:dio/dio.dart';
import 'package:driver_app/core/locators/service.locator.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:driver_app/core/storage/secure-storage.dart';

class ApiClient {
  late final Dio _dio;
  late final SecureStorageService _secureStorageService;

  ApiClient(){
    
    _secureStorageService = getIt<SecureStorageService>();

  
    _dio = Dio(
        BaseOptions(
          baseUrl: dotenv.env['API_BASE_URL'] ?? 'https://yourapi.com',
          connectTimeout: const Duration(seconds: 15),
          receiveTimeout: const Duration(seconds: 15),
        ),
      );
    _dio.interceptors.addAll(<Interceptor>[
      LogInterceptor(responseBody: true),

      InterceptorsWrapper(onRequest: (options, handler) async {
        List<String?> tokens = await Future.wait([
          _secureStorageService.getAccessToken(),
          _secureStorageService.getRefreshToken(),
          ]);

          options.headers.addAll({
            'Authorization': 'Bearer ${tokens[0]}',
            'x-refresh-token': tokens[1] ?? '',
          });
          return handler.next(options);
        }),

        InterceptorsWrapper(onResponse: (response, handler) async {
          if (response.statusCode == 401) {
            // Handle token refresh logic here
          }
          List<String>? tokens = response.headers.map['x-new-tokens'];
          if (tokens != null && tokens.length == 2) {
            await Future.wait([
              _secureStorageService.saveAccessToken(tokens[0]),
              _secureStorageService.saveRefreshToken(tokens[1]),
            ]);
          }
          return handler.next(response);

        }),

        InterceptorsWrapper(onError: (error, handler) async {
          if (error.response?.statusCode == 401) {
            // Handle token refresh logic here

            print('Unauthorized! Redirecting to login...');
          }
          await Future.wait([
            _secureStorageService.deleteAllTokens(),
          ]);
        })

      ],
    );
  }

  Dio get dioClient => _dio;
}

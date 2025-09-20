import 'package:dio/dio.dart';
import 'package:driver_app/core/locators/service.locator.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:driver_app/core/storage/secure-storage.dart';

class ApiClient {
  Dio _dio;
  late final SecureStorageService _secureStorageService;

  ApiClient(){
    
    _secureStorageService = getIt<SecureStorageService>();

    // List<String?> tokens = Future.wait([
    //   _secureStorageService.getAccessToken(),
    //   _secureStorageService.getRefreshToken(),
    // ]) as List<String?>;
  
    _dio = Dio(
        BaseOptions(
          baseUrl: dotenv.env['API_BASE_URL'] ?? 'https://yourapi.com',
          connectTimeout: const Duration(seconds: 15),
          receiveTimeout: const Duration(seconds: 15),
          // headers: {
          //   if (tokens[0] != null) 'Authorization': 'Bearer ${tokens[0]}',
          //   if (tokens[1] != null) 'x-refresh-token': tokens[1] ?? '',
          // },
        ),
      );
    _dio.interceptors.add(
      LogInterceptor(responseBody: true), // For debugging
      // Your custom AuthInterceptor will go here
      // add tokens to each outgoing request if they exist
      InterceptorsWrapper(
        onRequest: 
        // onRequest: (options, handler) async {
        //   List<String?> tokens = await Future.wait([
        //     _secureStorageService.getAccessToken(),
        //     _secureStorageService.getRefreshToken(),
        //   ]) as List<String?>;

        //   options.headers.addAll({
        //     'Authorization': 'Bearer ${tokens[0]}',
        //     'x-refresh-token': tokens[1] ?? '',
        //   });
        //   return handler.next(options);
        // },
      ),
    );
  }

  Dio get dioClient => _dio;
}

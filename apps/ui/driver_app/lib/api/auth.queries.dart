import 'package:dio/dio.dart';
import 'package:driver_app/api/api-client.dart';
import 'package:driver_app/core/storage/secure-storage.dart';
import 'package:driver_app/core/types/auth.types.dart';
import 'package:driver_app/core/types/user-details.types.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class AuthQueries {
  final ApiClient _apiClient;
  final SecureStorageService _secureStorageService;

  AuthQueries({
    required ApiClient apiClient,
    required SecureStorageService secureStorageService,
  }) : _apiClient = apiClient,
       _secureStorageService = secureStorageService;

  // static final AuthQueries instance = AuthQueries._privateConstructor();

  Future<LoginResponse> login(String email, String password) async {
    try {
      Response<LoginResponse> res = await _apiClient.dioClient.post(
        'https://yourapi.com/login',
        data: {'email': email, 'password': password},
      );

    print('Login Response: ${res.data}');

    await Future.wait([
      _secureStorageService.saveAccessToken(res.data!.accessToken),
      _secureStorageService.saveRefreshToken(res.data!.refreshToken),
    ]);
    return res.data!;
    } catch (e, stackTrace) {
      print('Login Error: $e');
      print('Login StackTrace: $stackTrace');
      rethrow;
    }
  }

  Future<UserDetails> whoAmI() async {
    List<String?> tokens = await Future.wait([
      _secureStorageService.getAccessToken(),
      _secureStorageService.getRefreshToken(),
    ]);

    if (tokens[0] == null) {
      throw Exception('No access token found');
    }

    Response<UserDetails> res = await _apiClient.dioClient.get('/whoami',
      options: Options(
        headers: {'Authorization': 'Bearer ${tokens[0]}',
          'x-refresh-token': tokens[1] ?? '',
        },
      ),
    );

    print('WhoAmI Response: ${res.data}');
    return res.data!;
  }

}

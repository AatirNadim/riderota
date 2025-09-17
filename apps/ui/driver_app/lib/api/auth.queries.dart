import 'package:dio/dio.dart';
import 'package:driver_app/api/api-client.dart';
import 'package:driver_app/core/storage/secure-storage.dart';
import 'package:driver_app/core/types/auth.types.dart';

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
  }
}

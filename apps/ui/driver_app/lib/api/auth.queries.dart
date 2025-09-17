import 'package:dio/dio.dart';
import 'package:driver_app/core/storage/secure-storage.dart';
import 'package:driver_app/core/types/auth.types.dart';

class AuthQueries {
  static final Dio dio = Dio();

  AuthQueries._privateConstructor();
  
  static final AuthQueries instance = AuthQueries._privateConstructor();

  static Future<LoginResponse> login(String email, String password) async {
    Response<LoginResponse> res = await dio.post(
      'https://yourapi.com/login',
      data: {'email': email, 'password': password},
    );

    print('Login Response: ${res.data}');

    await Future.wait([
      SecureStorageService.instance.saveAccessToken(res.data!.accessToken),
      SecureStorageService.instance.saveRefreshToken(res.data!.refreshToken),
    ]);
    return res.data!;
  }
}

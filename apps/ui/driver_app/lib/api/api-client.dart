import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ApiClient {
  final Dio _dio;

  ApiClient()
    : _dio = Dio(
        BaseOptions(
          baseUrl: dotenv.env['API_BASE_URL'] ?? 'https://yourapi.com',
          connectTimeout: const Duration(seconds: 15),
          receiveTimeout: const Duration(seconds: 15),
        ),
      ) {
    // This is where you will add your interceptor for token refreshing
    _dio.interceptors.add(
      LogInterceptor(responseBody: true), // For debugging
      // Your custom AuthInterceptor will go here
    );
  }

  Dio get dioClient => _dio;
}

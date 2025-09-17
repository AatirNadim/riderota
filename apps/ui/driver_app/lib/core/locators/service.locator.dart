import 'package:driver_app/api/api-client.dart';
import 'package:driver_app/core/storage/secure-storage.dart';
import 'package:driver_app/core/types/auth.types.dart';

import 'package:get_it/get_it.dart';

final getIt = GetIt.instance;

void setupServiceLocator() {
  getIt.registerSingleton<SecureStorageService>(SecureStorageService.instance);
  getIt.registerSingleton<ApiClient>(ApiClient());
  //getIt.registerSingleton<AuthService>(() => AuthService(getIt<SecureStorage>(), getIt<ApiClient>()));
}

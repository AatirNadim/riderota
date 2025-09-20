import 'package:driver_app/api/api-client.dart';
import 'package:driver_app/core/blocs/user_details/user-details.events.dart';
import 'package:driver_app/core/blocs/user_details/user-details.state.dart';
import 'package:driver_app/core/types/user-details.types.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import "package:driver_app/core/locators/service.locator.dart";

class UserDetailsBloc extends Bloc<UserDetailsEvent, UserDetailsState> {

  final ApiClient apiClient = getIt<ApiClient>();

  UserDetailsBloc() : super(UserDetailsInitialState()) {
    on<LoadUserDetailsEvent>(_onLoadUserDetails);
    on<UpdateUserDetailsEvent>(_onUpdateUserDetails);
  }

  Future<void> _onLoadUserDetails(LoadUserDetailsEvent event, Emitter<UserDetailsState> emit) async {
    emit(UserDetailsLoadingState());
    try {
      // Mock API call to fetch user details
      await Future.delayed(const Duration(seconds: 1));
      // await apiClient.dioClient.get(path)
      final userDetails = UserDetails(
        id: event.userId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNo: '+1234567890',
        role: UserRole.DRIVER,
        address: const Address(id: 'addr1', addressLine1: '123 Main St', city: 'Anytown', zipCode: '12345'),
        vehicle: const VehicleDetails(id: 'veh1', make: 'Toyota', model: 'Camry', licensePlate: 'DRI-V3R', color: 'Blue', capacity: 4),
      );
      emit(UserDetailsLoadedState(userDetails));
    } catch (e) {
      emit(UserDetailsErrorState('Failed to fetch user details: ${e.toString()}'));
    }
  }

  Future<void> _onUpdateUserDetails(UpdateUserDetailsEvent event, Emitter<UserDetailsState> emit) async {
    if (state is UserDetailsLoadedState) {
      emit(UserDetailsLoadingState());
      try {
        // Mock API call to update user details
        await Future.delayed(const Duration(seconds: 1));
        emit(UserDetailsLoadedState(event.userDetails));
      } catch (e) {
        emit(UserDetailsErrorState('Failed to update user details: ${e.toString()}'));
      }
    }
  }
}

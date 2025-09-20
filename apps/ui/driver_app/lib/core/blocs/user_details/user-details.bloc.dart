import 'package:driver_app/core/blocs/user_details/user-details.events.dart';
import 'package:driver_app/core/blocs/user_details/user-details.state.dart';
import 'package:driver_app/core/types/user-details.types.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class UserDetailsBloc extends Bloc<UserDetailsEvent, UserDetailsState> {
  UserDetailsBloc() : super(UserDetailsInitial()) {
    on<LoadUserDetails>(_onLoadUserDetails);
    on<UpdateUserDetails>(_onUpdateUserDetails);
  }

  Future<void> _onLoadUserDetails(LoadUserDetails event, Emitter<UserDetailsState> emit) async {
    emit(UserDetailsLoading());
    try {
      // Mock API call to fetch user details
      await Future.delayed(const Duration(seconds: 1));
      final userDetails = UserDetails(
        id: event.userId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        phoneNo: '+1234567890',
        role: UserRole.DRIVER,
        address: const Address(id: 'addr1', addressLine1: '123 Main St', city: 'Anytown', zipCode: '12345'),
        vehicle: const VehicleDetails(id: 'veh1', make: 'Toyota', model: 'Camry', licensePlate: 'DRI-V3R', color: 'Blue', capacity: 4),
      );
      emit(UserDetailsLoaded(userDetails));
    } catch (e) {
      emit(UserDetailsError('Failed to fetch user details: ${e.toString()}'));
    }
  }

  Future<void> _onUpdateUserDetails(UpdateUserDetails event, Emitter<UserDetailsState> emit) async {
    if (state is UserDetailsLoaded) {
      emit(UserDetailsLoading());
      try {
        // Mock API call to update user details
        await Future.delayed(const Duration(seconds: 1));
        emit(UserDetailsLoaded(event.userDetails));
      } catch (e) {
        emit(UserDetailsError('Failed to update user details: ${e.toString()}'));
      }
    }
  }
}

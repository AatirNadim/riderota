import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

// --- Data Models based on Prisma Schema ---

class Address extends Equatable {
  final String id;
  final String addressLine1;
  final String? addressLine2;
  final String city;
  final String zipCode;
  final String? landMark;

  const Address({
    required this.id,
    required this.addressLine1,
    this.addressLine2,
    required this.city,
    required this.zipCode,
    this.landMark,
  });

    @override
  List<Object?> get props => [id, addressLine1, addressLine2, city, zipCode, landMark];

  Address copyWith({
    String? id,
    String? addressLine1,
    String? addressLine2,
    String? city,
    String? zipCode,
    String? landMark,
  }) {
    return Address(
      id: id ?? this.id,
      addressLine1: addressLine1 ?? this.addressLine1,
      addressLine2: addressLine2 ?? this.addressLine2,
      city: city ?? this.city,
      zipCode: zipCode ?? this.zipCode,
      landMark: landMark ?? this.landMark,
    );
  }
}

class VehicleDetails extends Equatable {
  final String id;
  final String make;
  final String model;
  final String licensePlate;
  final String color;
  final int capacity;

  const VehicleDetails({
    required this.id,
    required this.make,
    required this.model,
    required this.licensePlate,
    required this.color,
    required this.capacity,
  });

  @override
  List<Object?> get props => [id, make, model, licensePlate, color, capacity];

  VehicleDetails copyWith({
    String? id,
    String? make,
    String? model,
    String? licensePlate,
    String? color,
    int? capacity,
  }) {
    return VehicleDetails(
      id: id ?? this.id,
      make: make ?? this.make,
      model: model ?? this.model,
      licensePlate: licensePlate ?? this.licensePlate,
      color: color ?? this.color,
      capacity: capacity ?? this.capacity,
    );
  }
}

enum UserRole { SUPERADMIN, ADMIN, DRIVER, EMPLOYEE }
// ...existing code...

class UserDetails extends Equatable {
  final String id;
  final String email;
  final String name;
  final int? age;
  final String phoneNo;
  final String? profileImgUrl;
  final Address? address;
  final UserRole role;
  final VehicleDetails? vehicle;

  const UserDetails({
    required this.id,
    required this.email,
    required this.name,
    this.age,
    required this.phoneNo,
    this.profileImgUrl,
    this.address,
    required this.role,
    this.vehicle,
  });

  @override
  List<Object?> get props => [id, email, name, age, phoneNo, profileImgUrl, address, role, vehicle];

  UserDetails copyWith({
    String? id,
    String? email,
    String? name,
    int? age,
    String? phoneNo,
    String? profileImgUrl,
    Address? address,
    UserRole? role,
    VehicleDetails? vehicle,
  }) {
    return UserDetails(
      id: id ?? this.id,
      email: email ?? this.email,
      name: name ?? this.name,
      age: age ?? this.age,
      phoneNo: phoneNo ?? this.phoneNo,
      profileImgUrl: profileImgUrl ?? this.profileImgUrl,
      address: address ?? this.address,
      role: role ?? this.role,
      vehicle: vehicle ?? this.vehicle,
    );
  }
}


// --- BLoC Events ---

@immutable
abstract class UserDetailsEvent extends Equatable {
  const UserDetailsEvent();
}

class LoadUserDetails extends UserDetailsEvent {
  final String userId;
  const LoadUserDetails(this.userId);

  @override
  List<Object> get props => [userId];
}

class UpdateUserDetails extends UserDetailsEvent {
  final UserDetails userDetails;
  const UpdateUserDetails(this.userDetails);

  @override
  List<Object> get props => [userDetails];
}

// --- BLoC States ---

@immutable
abstract class UserDetailsState extends Equatable {
  const UserDetailsState();
}

class UserDetailsInitial extends UserDetailsState {
  @override
  List<Object> get props => [];
}

class UserDetailsLoading extends UserDetailsState {
  @override
  List<Object> get props => [];
}

class UserDetailsLoaded extends UserDetailsState {
  final UserDetails userDetails;
  const UserDetailsLoaded(this.userDetails);

  @override
  List<Object> get props => [userDetails];
}

class UserDetailsError extends UserDetailsState {
  final String message;
  const UserDetailsError(this.message);

  @override
  List<Object> get props => [message];
}

// --- UserDetails BLoC ---

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

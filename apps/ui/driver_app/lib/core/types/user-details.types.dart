import 'package:equatable/equatable.dart';

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

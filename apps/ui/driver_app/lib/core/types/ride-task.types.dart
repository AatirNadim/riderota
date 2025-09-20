import 'package:equatable/equatable.dart';

enum RideTaskStatus {
  REGISTERED,
  PENDING,
  IN_PROGRESS,
  COMPLETED,
  CANCELLED,
  EXPIRED
}

class RideTask extends Equatable {
  final String id;
  final DateTime createdAt;
  final DateTime updatedAt;
  final RideTaskStatus status;
  final String driverId;
  final String passengerId;
  final String from;
  final String to;
  final DateTime rideExpires;

  const RideTask({
    required this.id,
    required this.createdAt,
    required this.updatedAt,
    required this.status,
    required this.driverId,
    required this.passengerId,
    required this.from,
    required this.to,
    required this.rideExpires,
  });

  factory RideTask.fromJson(Map<String, dynamic> json) {
    return RideTask(
      id: json['id'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
      status: RideTaskStatus.values.firstWhere(
        (e) => e.toString() == 'RideTaskStatus.${json['status']}',
      ),
      driverId: json['driverId'],
      passengerId: json['passengerId'],
      from: json['from'],
      to: json['to'],
      rideExpires: DateTime.parse(json['rideExpires']),
    );
  }

  @override
  List<Object?> get props => [
        id,
        createdAt,
        updatedAt,
        status,
        driverId,
        passengerId,
        from,
        to,
        rideExpires
      ];
}
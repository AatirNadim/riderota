import 'package:equatable/equatable.dart';

abstract class RideTasksEvent extends Equatable {
  const RideTasksEvent();

  @override
  List<Object> get props => [];
}

class FetchRideTasksEvent extends RideTasksEvent {}

class CompleteRideTaskEvent extends RideTasksEvent {
  final String rideTaskId;

  const CompleteRideTaskEvent(this.rideTaskId);

  @override
  List<Object> get props => [rideTaskId];
}
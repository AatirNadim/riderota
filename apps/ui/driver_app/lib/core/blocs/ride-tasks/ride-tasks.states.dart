import 'package:driver_app/core/types/ride-task.types.dart';
import 'package:equatable/equatable.dart';

abstract class RideTasksState extends Equatable {
  const RideTasksState();

  @override
  List<Object> get props => [];
}

class RideTasksInitialState extends RideTasksState {}

class RideTasksLoadingState extends RideTasksState {}

class RideTasksLoadedState extends RideTasksState {
  final List<RideTask> tasks;

  const RideTasksLoadedState(this.tasks);

  @override
  List<Object> get props => [tasks];
}

class RideTasksErrorState extends RideTasksState {
  final String message;

  const RideTasksErrorState(this.message);

  @override
  List<Object> get props => [message];
}
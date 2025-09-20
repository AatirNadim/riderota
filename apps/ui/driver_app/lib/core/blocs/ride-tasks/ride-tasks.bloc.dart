import 'package:driver_app/api/api-client.dart';
import 'package:driver_app/core/blocs/ride-tasks/ride-tasks.events.dart';
import 'package:driver_app/core/blocs/ride-tasks/ride-tasks.states.dart';
import 'package:driver_app/core/locators/service.locator.dart';
import 'package:driver_app/core/types/ride-task.types.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class RideTasksBloc extends Bloc<RideTasksEvent, RideTasksState> {
  final ApiClient apiClient = getIt<ApiClient>();

  RideTasksBloc() : super(RideTasksInitialState()) {
    on<FetchRideTasksEvent>(_onFetchRideTasks);
    on<CompleteRideTaskEvent>(_onCompleteRideTask);
  }

  Future<void> _onFetchRideTasks(
      FetchRideTasksEvent event, Emitter<RideTasksState> emit) async {
    emit(RideTasksLoadingState());
    try {
      final response = await apiClient.dioClient.get(
        '/driver/tasks',
        queryParameters: {'status': 'PENDING'},
      );

      if (response.statusCode == 200) {
        final tasks = (response.data as List)
            .map((task) => RideTask.fromJson(task))
            .toList();
        emit(RideTasksLoadedState(tasks));
      } else {
        emit(const RideTasksErrorState('Failed to fetch ride tasks.'));
      }
    } catch (e) {
      emit(RideTasksErrorState('An error occurred: ${e.toString()}'));
    }
  }

  Future<void> _onCompleteRideTask(
      CompleteRideTaskEvent event, Emitter<RideTasksState> emit) async {
    if (state is RideTasksLoadedState) {
      final currentState = state as RideTasksLoadedState;
      try {
        final response = await apiClient.dioClient.post(
          '/driver/tasks/complete',
          data: {'rideTaskId': event.rideTaskId},
        );

        if (response.statusCode == 200) {
          final updatedTasks = currentState.tasks
              .where((task) => task.id != event.rideTaskId)
              .toList();
          emit(RideTasksLoadedState(updatedTasks));
        } else {
          emit(const RideTasksErrorState('Failed to complete ride task.'));
          emit(currentState); // Revert to previous state on failure
        }
      } catch (e) {
        emit(RideTasksErrorState(
            'An error occurred while completing the task: ${e.toString()}'));
        emit(currentState); // Revert on error
      }
    }
  }
}
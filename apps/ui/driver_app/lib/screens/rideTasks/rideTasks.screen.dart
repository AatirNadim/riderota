import 'package:driver_app/core/blocs/ride-tasks/ride-tasks.bloc.dart';
import 'package:driver_app/core/blocs/ride-tasks/ride-tasks.events.dart';
import 'package:driver_app/core/blocs/ride-tasks/ride-tasks.states.dart';
import 'package:driver_app/core/widgets/task-error-state.widget.dart';
import 'package:driver_app/core/widgets/task-list-empty.widget.dart';
import 'package:driver_app/core/widgets/task-list.widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

class RideTasksScreen extends StatefulWidget {
  const RideTasksScreen({super.key});

  @override
  State<RideTasksScreen> createState() => _RideTasksScreenState();
}

class _RideTasksScreenState extends State<RideTasksScreen> {
  @override
  void initState() {
    super.initState();
    context.read<RideTasksBloc>().add(FetchRideTasksEvent());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Ride Tasks'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.canPop() ? context.pop() : context.go('/'),
        ),
      ),
      body: BlocBuilder<RideTasksBloc, RideTasksState>(
        builder: (context, state) {
          if (state is RideTasksLoadingState) {
            return const Center(child: CircularProgressIndicator());
          } else if (state is RideTasksErrorState) {
            return buildErrorState(context, state.message);
          } else if (state is RideTasksLoadedState) {
            if (state.tasks.isEmpty) {
              return buildEmptyState(context);
            }
            return buildTaskList(context, state.tasks);
          }
          return const Center(child: Text('No tasks available.'));
        },
      ),
    );
  }

}
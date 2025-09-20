import 'package:driver_app/core/blocs/ride-tasks/ride-tasks.bloc.dart';
import 'package:driver_app/core/blocs/ride-tasks/ride-tasks.events.dart';
import 'package:driver_app/core/blocs/ride-tasks/ride-tasks.states.dart';
import 'package:driver_app/core/types/ride-task.types.dart';
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
            return _buildErrorState(context, state.message);
          } else if (state is RideTasksLoadedState) {
            if (state.tasks.isEmpty) {
              return _buildEmptyState(context);
            }
            return _buildTaskList(context, state.tasks);
          }
          return const Center(child: Text('No tasks available.'));
        },
      ),
    );
  }

  Widget _buildTaskList(BuildContext context, List<RideTask> tasks) {
    return ListView.builder(
      padding: const EdgeInsets.all(8.0),
      itemCount: tasks.length,
      itemBuilder: (context, index) {
        final task = tasks[index];
        return _buildTaskCard(context, task);
      },
    );
  }

  Widget _buildTaskCard(BuildContext context, RideTask task) {
    final theme = Theme.of(context);
    return Card(
      elevation: 4,
      margin: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 8.0),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildCardHeader(context, "Passenger"), // Placeholder
            const Divider(height: 24),
            _buildInfoRow(theme, Icons.location_on_outlined, 'From', task.from),
            const SizedBox(height: 12),
            _buildInfoRow(theme, Icons.flag_outlined, 'To', task.to),
            const SizedBox(height: 12),
            _buildInfoRow(
                theme,
                Icons.timer_outlined,
                'Expires',
                '${task.rideExpires.hour}:${task.rideExpires.minute.toString().padLeft(2, '0')}'),
            const SizedBox(height: 16),
            Align(
              alignment: Alignment.centerRight,
              child: ElevatedButton(
                onPressed: () {
                  context
                      .read<RideTasksBloc>()
                      .add(CompleteRideTaskEvent(task.id));
                },
                child: const Text('Mark as Complete'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCardHeader(BuildContext context, String passengerName) {
    final theme = Theme.of(context);
    return Row(
      children: [
        Icon(Icons.person_pin_circle_outlined,
            color: theme.colorScheme.primary, size: 28),
        const SizedBox(width: 12),
        Text(
          passengerName,
          style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
        ),
      ],
    );
  }

  Widget _buildInfoRow(
      ThemeData theme, IconData icon, String label, String value) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(icon, color: theme.colorScheme.secondary, size: 20),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(label,
                  style: theme.textTheme.labelMedium
                      ?.copyWith(color: theme.colorScheme.onSurface.withOpacity(0.6))),
              const SizedBox(height: 2),
              Text(value, style: theme.textTheme.bodyLarge),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildErrorState(BuildContext context, String message) {
    final theme = Theme.of(context);
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.error_outline, color: theme.colorScheme.error, size: 60),
            const SizedBox(height: 16),
            Text(
              'Failed to load ride tasks',
              style: theme.textTheme.headlineSmall,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            Text(
              message,
              style: theme.textTheme.bodyLarge,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 24),
            ElevatedButton.icon(
              onPressed: () =>
                  context.read<RideTasksBloc>().add(FetchRideTasksEvent()),
              icon: const Icon(Icons.refresh),
              label: const Text('Retry'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildEmptyState(BuildContext context) {
    final theme = Theme.of(context);
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.explore_off_outlined,
                color: theme.colorScheme.secondary, size: 60),
            const SizedBox(height: 16),
            Text(
              'No ride tasks available',
              style: theme.textTheme.headlineSmall,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            Text(
              'New tasks assigned to you will appear here.',
              style: theme.textTheme.bodyLarge,
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
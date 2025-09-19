import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'dart:async';

// Mock data model for a ride task
class RideTask {
  final String id;
  final String passengerName;
  final String from;
  final String to;
  final DateTime rideExpires;

  RideTask({
    required this.id,
    required this.passengerName,
    required this.from,
    required this.to,
    required this.rideExpires,
  });
}

class RideTasksScreen extends StatefulWidget {
  const RideTasksScreen({super.key});

  @override
  State<RideTasksScreen> createState() => _RideTasksScreenState();
}

class _RideTasksScreenState extends State<RideTasksScreen> {
  late Future<List<RideTask>> _rideTasksFuture;

  @override
  void initState() {
    super.initState();
    _rideTasksFuture = _fetchRideTasks();
  }

  // Mock function to simulate fetching data from a BLoC
  Future<List<RideTask>> _fetchRideTasks() async {
    // Simulate network delay
    await Future.delayed(const Duration(seconds: 2));

    // In a real app, you would call your BLoC here, e.g.:
    // return context.read<RideTasksBloc>().fetchTasks();

    // Mock data for demonstration
    return [
      RideTask(
        id: 'ride_task_123',
        passengerName: 'John Doe',
        from: '123 Main St, Anytown, USA',
        to: '456 Elm St, Othertown, USA',
        rideExpires: DateTime.now().add(const Duration(hours: 1)),
      ),
      RideTask(
        id: 'ride_task_124',
        passengerName: 'Jane Smith',
        from: '789 Oak Ave, Sometown, USA',
        to: '101 Pine Ln, Yourtown, USA',
        rideExpires: DateTime.now().add(const Duration(hours: 2)),
      ),
      RideTask(
        id: 'ride_task_125',
        passengerName: 'Peter Jones',
        from: '212 Maple Dr, Anothertown, USA',
        to: '333 Birch Rd, Finaltown, USA',
        rideExpires: DateTime.now().add(const Duration(hours: 3)),
      ),
    ];
  }

  void _retryFetch() {
    setState(() {
      _rideTasksFuture = _fetchRideTasks();
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Ride Tasks'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
            if (context.canPop()) {
              context.pop();
            } else {
              context.go('/'); // Fallback to home
            }
          },
        ),
      ),
      body: FutureBuilder<List<RideTask>>(
        future: _rideTasksFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return _buildErrorState(context, snapshot.error);
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return _buildEmptyState(context);
          } else {
            final tasks = snapshot.data!;
            return _buildTaskList(context, tasks);
          }
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
            _buildCardHeader(context, task.passengerName),
            const Divider(height: 24),
            _buildInfoRow(theme, Icons.location_on_outlined, 'From', task.from),
            const SizedBox(height: 12),
            _buildInfoRow(theme, Icons.flag_outlined, 'To', task.to),
            const SizedBox(height: 12),
            _buildInfoRow(theme, Icons.timer_outlined, 'Expires', '${task.rideExpires.hour}:${task.rideExpires.minute.toString().padLeft(2, '0')}'),
          ],
        ),
      ),
    );
  }

  Widget _buildCardHeader(BuildContext context, String passengerName) {
    final theme = Theme.of(context);
    return Row(
      children: [
        Icon(Icons.person_pin_circle_outlined, color: theme.colorScheme.primary, size: 28),
        const SizedBox(width: 12),
        Text(
          passengerName,
          style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
        ),
      ],
    );
  }

  Widget _buildInfoRow(ThemeData theme, IconData icon, String label, String value) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Icon(icon, color: theme.colorScheme.secondary, size: 20),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(label, style: theme.textTheme.labelMedium?.copyWith(color: theme.colorScheme.onSurface.withOpacity(0.6))),
              const SizedBox(height: 2),
              Text(value, style: theme.textTheme.bodyLarge),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildErrorState(BuildContext context, Object? error) {
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
              'Please check your connection and try again.',
              style: theme.textTheme.bodyLarge,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 24),
            ElevatedButton.icon(
              onPressed: _retryFetch,
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
            Icon(Icons.explore_off_outlined, color: theme.colorScheme.secondary, size: 60),
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

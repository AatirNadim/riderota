import 'package:driver_app/core/blocs/ride-tasks/ride-tasks.bloc.dart';
import 'package:driver_app/core/blocs/ride-tasks/ride-tasks.events.dart';
import 'package:driver_app/core/types/ride-task.types.dart';
import 'package:driver_app/core/widgets/task-card-header.widget.dart';
import 'package:driver_app/core/widgets/task-info-row.widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

Widget buildTaskCard(BuildContext context, RideTask task) {
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
            buildCardHeader(context, "Passenger"), // Placeholder
            const Divider(height: 24),
            buildInfoRow(theme, Icons.location_on_outlined, 'From', task.from),
            const SizedBox(height: 12),
            buildInfoRow(theme, Icons.flag_outlined, 'To', task.to),
            const SizedBox(height: 12),
            buildInfoRow(
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

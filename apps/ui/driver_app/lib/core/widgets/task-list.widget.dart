  import 'package:driver_app/core/types/ride-task.types.dart';
import 'package:driver_app/core/widgets/task-card.widget.dart';
import 'package:flutter/material.dart';

Widget buildTaskList(BuildContext context, List<RideTask> tasks) {
    return ListView.builder(
      padding: const EdgeInsets.all(8.0),
      itemCount: tasks.length,
      itemBuilder: (context, index) {
        final task = tasks[index];
        return buildTaskCard(context, task);
      },
    );
  }

import 'package:flutter/material.dart';

Widget buildEmptyState(BuildContext context) {
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

import 'package:flutter/material.dart';

Widget buildCardHeader(BuildContext context, String passengerName) {
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
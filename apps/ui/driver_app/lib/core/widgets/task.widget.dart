import 'package:flutter/material.dart';

class TaskWidget extends StatelessWidget {
  final String title;
  final String description;

  TaskWidget({required this.title, required this.description});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(title: Text(title), subtitle: Text(description)),
    );
  }
}

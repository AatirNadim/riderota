import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
        leading: Tooltip(
          message: 'Go back to login',
          child: IconButton(
            icon: const Icon(Icons.arrow_back),
            onPressed: () {
              context.go('/login');
            },
          ),
        ),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            context.go('/login');
          },
          style: ElevatedButton.styleFrom(backgroundColor: Colors.amber),
          child: Text(
            'Go to login',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
        ),
      ),
    );
  }
}

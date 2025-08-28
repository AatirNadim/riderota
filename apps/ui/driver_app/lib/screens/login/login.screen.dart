import 'package:flutter/material.dart';

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Login')),
      body: Center(
        child: TextField(
          decoration: InputDecoration(
            labelText: 'Enter your email',
            border: OutlineInputBorder(),
          ),
          onChanged: (text) {
            // Handle text changes
          },
        ),
      ),
    );
  }
}

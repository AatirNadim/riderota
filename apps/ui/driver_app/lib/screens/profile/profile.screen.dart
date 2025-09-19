import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final _formKey = GlobalKey<FormState>();

  // Controllers for driver details
  final _nameController = TextEditingController(text: 'John Doe');
  final _phoneController = TextEditingController(text: '+1 123 456 7890');
  final _addressController = TextEditingController(text: '123 Main St, Anytown, USA');

  // Controllers for vehicle details
  final _makeController = TextEditingController(text: 'Toyota');
  final _modelController = TextEditingController(text: 'Camry');
  final _colorController = TextEditingController(text: 'Blue');
  final _licensePlateController = TextEditingController(text: 'RIDE-123');
  final _capacityController = TextEditingController(text: '4');

  @override
  void dispose() {
    _nameController.dispose();
    _phoneController.dispose();
    _addressController.dispose();
    _makeController.dispose();
    _modelController.dispose();
    _colorController.dispose();
    _licensePlateController.dispose();
    _capacityController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Update Profile'),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => context.go('/'),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              _buildProfileImage(theme),
              const SizedBox(height: 24),
              _buildSectionCard(
                theme,
                title: 'Personal Details',
                icon: Icons.person,
                children: [
                  _buildTextField(controller: _nameController, label: 'Full Name', icon: Icons.person_outline),
                  const SizedBox(height: 16),
                  _buildTextField(controller: _phoneController, label: 'Phone Number', icon: Icons.phone_outlined, keyboardType: TextInputType.phone),
                  const SizedBox(height: 16),
                  _buildTextField(controller: _addressController, label: 'Address', icon: Icons.home_outlined),
                ],
              ),
              const SizedBox(height: 24),
              _buildSectionCard(
                theme,
                title: 'Vehicle Details',
                icon: Icons.directions_car,
                children: [
                  _buildTextField(controller: _makeController, label: 'Car Make', icon: Icons.branding_watermark_outlined),
                  const SizedBox(height: 16),
                  _buildTextField(controller: _modelController, label: 'Car Model', icon: Icons.model_training_outlined),
                  const SizedBox(height: 16),
                  _buildTextField(controller: _colorController, label: 'Color', icon: Icons.color_lens_outlined),
                  const SizedBox(height: 16),
                  _buildTextField(controller: _licensePlateController, label: 'License Plate', icon: Icons.pin_outlined),
                  const SizedBox(height: 16),
                  _buildTextField(controller: _capacityController, label: 'Capacity', icon: Icons.people_outline, keyboardType: TextInputType.number),
                ],
              ),
              const SizedBox(height: 32),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Profile Updated Successfully!'),
                        backgroundColor: Colors.green,
                      ),
                    );
                  }
                },
                child: const Text('Update Profile'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildProfileImage(ThemeData theme) {
    return Center(
      child: Stack(
        children: [
          CircleAvatar(
            radius: 60,
            backgroundImage: const NetworkImage('https://example.com/profile.jpg'), // Placeholder
            backgroundColor: theme.colorScheme.surface,
          ),
          Positioned(
            bottom: 0,
            right: 0,
            child: CircleAvatar(
              radius: 20,
              backgroundColor: theme.colorScheme.primary,
              child: IconButton(
                icon: const Icon(Icons.camera_alt, color: Colors.white, size: 20),
                onPressed: () {
                  // TODO: Implement image picker
                },
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionCard(ThemeData theme, {required String title, required IconData icon, required List<Widget> children}) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(icon, color: theme.colorScheme.primary),
                const SizedBox(width: 8),
                Text(
                  title,
                  style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
                ),
              ],
            ),
            const Divider(height: 24),
            ...children,
          ],
        ),
      ),
    );
  }

  Widget _buildTextField({required TextEditingController controller, required String label, required IconData icon, TextInputType? keyboardType}) {
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
        ),
        filled: true,
        fillColor: Colors.grey.shade100,
      ),
      keyboardType: keyboardType,
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'This field cannot be empty';
        }
        return null;
      },
    );
  }
}

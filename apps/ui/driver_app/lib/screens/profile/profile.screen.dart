import 'package:driver_app/core/blocs/user-details.bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  final _formKey = GlobalKey<FormState>();

  // Controllers for driver details
  final _nameController = TextEditingController();
  final _phoneController = TextEditingController();
  final _addressController = TextEditingController();

  // Controllers for vehicle details
  final _makeController = TextEditingController();
  final _modelController = TextEditingController();
  final _colorController = TextEditingController();
  final _licensePlateController = TextEditingController();
  final _capacityController = TextEditingController();

  @override
  void initState() {
    super.initState();
    // Assuming we have a way to get the current user's ID, we trigger the load.
    context.read<UserDetailsBloc>().add(const LoadUserDetails('current_user_id'));
  }

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

  void _updateControllers(UserDetails userDetails) {
    _nameController.text = userDetails.name;
    _phoneController.text = userDetails.phoneNo;
    _addressController.text = userDetails.address?.addressLine1 ?? '';
    _makeController.text = userDetails.vehicle?.make ?? '';
    _modelController.text = userDetails.vehicle?.model ?? '';
    _colorController.text = userDetails.vehicle?.color ?? '';
    _licensePlateController.text = userDetails.vehicle?.licensePlate ?? '';
    _capacityController.text = userDetails.vehicle?.capacity.toString() ?? '';
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
      body: BlocConsumer<UserDetailsBloc, UserDetailsState>(
        listener: (context, state) {
          if (state is UserDetailsLoaded) {
            _updateControllers(state.userDetails);
            ScaffoldMessenger.of(context)
              ..hideCurrentSnackBar()
              ..showSnackBar(
                const SnackBar(
                  content: Text('Profile updated!'),
                  backgroundColor: Colors.green,
                ),
              );
          } else if (state is UserDetailsError) {
            ScaffoldMessenger.of(context)
              ..hideCurrentSnackBar()
              ..showSnackBar(
                SnackBar(
                  content: Text(state.message),
                  backgroundColor: theme.colorScheme.error,
                ),
              );
          } else if (state is UserDetailsLoading) {
            ScaffoldMessenger.of(context)
              ..hideCurrentSnackBar()
              ..showSnackBar(
                const SnackBar(
                  content: Text('Updating profile...'),
                  duration: Duration(seconds: 1),
                ),
              );
          }
        },
        builder: (context, state) {
          if (state is UserDetailsInitial || state is UserDetailsLoading && state is! UserDetailsLoaded) {
            return const Center(child: CircularProgressIndicator());
          }

          if (state is UserDetailsError && state is! UserDetailsLoaded) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text('Failed to load profile.'),
                  const SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: () {
                      context.read<UserDetailsBloc>().add(const LoadUserDetails('current_user_id'));
                    },
                    child: const Text('Retry'),
                  )
                ],
              ),
            );
          }

          if (state is UserDetailsLoaded) {
            return SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    _buildProfileImage(theme, state.userDetails.profileImgUrl),
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
                          final updatedDetails = state.userDetails.copyWith(
                            name: _nameController.text,
                            phoneNo: _phoneController.text,
                            address: state.userDetails.address?.copyWith(addressLine1: _addressController.text) ?? Address(id: 'new', addressLine1: _addressController.text, city: '', zipCode: ''),
                            vehicle: state.userDetails.vehicle?.copyWith(
                                  make: _makeController.text,
                                  model: _modelController.text,
                                  color: _colorController.text,
                                  licensePlate: _licensePlateController.text,
                                  capacity: int.tryParse(_capacityController.text) ?? 0,
                                ) ??
                                VehicleDetails(id: 'new', make: _makeController.text, model: _modelController.text, licensePlate: _licensePlateController.text, color: _colorController.text, capacity: int.tryParse(_capacityController.text) ?? 0),
                          );
                          context.read<UserDetailsBloc>().add(UpdateUserDetails(updatedDetails));
                        }
                      },
                      child: const Text('Update Profile'),
                    ),
                  ],
                ),
              ),
            );
          }
          return const Center(child: Text('Something went wrong.'));
        },
      ),
    );
  }

  Widget _buildProfileImage(ThemeData theme, String? profileImgUrl) {
    return Center(
      child: Stack(
        children: [
          CircleAvatar(
            radius: 60,
            backgroundImage: profileImgUrl != null ? NetworkImage(profileImgUrl) : null,
            backgroundColor: theme.colorScheme.surface,
            child: profileImgUrl == null ? const Icon(Icons.person, size: 60) : null,
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

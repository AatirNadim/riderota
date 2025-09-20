import 'package:flutter/material.dart';

Widget buildProfileImage(ThemeData theme, String? profileImgUrl) => Center(
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

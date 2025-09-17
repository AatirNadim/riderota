import 'package:flutter/material.dart';

class AppColors {
  // Primary Colors
  static const Color primary50 = Color(0xFFeff6ff);
  static const Color primary100 = Color(0xFFdbeafe);
  static const Color primary200 = Color(0xFFbfdbfe);
  static const Color primary300 = Color(0xFF93c5fd);
  static const Color primary400 = Color(0xFF60a5fa);
  static const Color primary500 = Color(0xFF3b82f6);
  static const Color primary600 = Color(0xFF2563eb);
  static const Color primary700 = Color(0xFF1d4ed8);
  static const Color primary800 = Color(0xFF1e40af);
  static const Color primary900 = Color(0xFF1e3a8a);

  // Secondary Colors
  static const Color secondary50 = Color(0xFFf0f9ff);
  static const Color secondary100 = Color(0xFFe0f2fe);
  static const Color secondary200 = Color(0xFFbae6fd);
  static const Color secondary300 = Color(0xFF7dd3fc);
  static const Color secondary400 = Color(0xFF38bdf8);
  static const Color secondary500 = Color(0xFF0ea5e9);
  static const Color secondary600 = Color(0xFF0284c7);
  static const Color secondary700 = Color(0xFF0369a1);
  static const Color secondary800 = Color(0xFF075985);
  static const Color secondary900 = Color(0xFF0c4a6e);

  // Accent Colors
  static const Color accent50 = Color(0xFFfdf4ff);
  static const Color accent100 = Color(0xFFfae8ff);
  static const Color accent200 = Color(0xFFf5d0fe);
  static const Color accent300 = Color(0xFFf0abfc);
  static const Color accent400 = Color(0xFFe879f9);
  static const Color accent500 = Color(0xFFd946ef);
  static const Color accent600 = Color(0xFFc026d3);
  static const Color accent700 = Color(0xFFa21caf);
  static const Color accent800 = Color(0xFF86198f);
  static const Color accent900 = Color(0xFF701a75);

  // Success Colors
  static const Color success50 = Color(0xFFf0fdf4);
  static const Color success100 = Color(0xFFdcfce7);
  static const Color success200 = Color(0xFFbbf7d0);
  static const Color success300 = Color(0xFF86efac);
  static const Color success400 = Color(0xFF4ade80);
  static const Color success500 = Color(0xFF22c55e);
  static const Color success600 = Color(0xFF16a34a);
  static const Color success700 = Color(0xFF15803d);
  static const Color success800 = Color(0xFF166534);
  static const Color success900 = Color(0xFF14532d);

  // Warning Colors
  static const Color warning50 = Color(0xFFfffbeb);
  static const Color warning100 = Color(0xFFfef3c7);
  static const Color warning200 = Color(0xFFfde68a);
  static const Color warning300 = Color(0xFFfcd34d);
  static const Color warning400 = Color(0xFFfbbf24);
  static const Color warning500 = Color(0xFFf59e0b);
  static const Color warning600 = Color(0xFFd97706);
  static const Color warning700 = Color(0xFFb45309);
  static const Color warning800 = Color(0xFF92400e);
  static const Color warning900 = Color(0xFF78350f);

  // Error Colors
  static const Color error50 = Color(0xFFfef2f2);
  static const Color error100 = Color(0xFFfee2e2);
  static const Color error200 = Color(0xFFfecaca);
  static const Color error300 = Color(0xFFfca5a5);
  static const Color error400 = Color(0xFFf87171);
  static const Color error500 = Color(0xFFef4444);
  static const Color error600 = Color(0xFFdc2626);
  static const Color error700 = Color(0xFFb91c1c);
  static const Color error800 = Color(0xFF991b1b);
  static const Color error900 = Color(0xFF7f1d1d);

  // Neutral Colors
  static const Color neutral50 = Color(0xFFf8fafc);
  static const Color neutral100 = Color(0xFFf1f5f9);
  static const Color neutral200 = Color(0xFFe2e8f0);
  static const Color neutral300 = Color(0xFFcbd5e1);
  static const Color neutral400 = Color(0xFF94a3b8);
  static const Color neutral500 = Color(0xFF64748b);
  static const Color neutral600 = Color(0xFF475569);
  static const Color neutral700 = Color(0xFF334155);
  static const Color neutral800 = Color(0xFF1e293b);
  static const Color neutral900 = Color(0xFF0f172a);
}

final ThemeData centralTheme = ThemeData(
  primaryColor: AppColors.primary500,
  scaffoldBackgroundColor: AppColors.neutral50,
  fontFamily: 'Inter', // Example font, ensure it's added to pubspec.yaml
  // ColorScheme defines the core color palette for the app
  colorScheme: const ColorScheme(
    brightness: Brightness.light,
    primary: AppColors.primary600,
    onPrimary: Colors.white,
    secondary: AppColors.secondary500,
    onSecondary: Colors.white,
    error: AppColors.error500,
    onError: Colors.white,
    surface: AppColors.neutral50,
    onSurface: AppColors.neutral900,
  ),

  // TextTheme defines default text styles
  textTheme: const TextTheme(
    displayLarge: TextStyle(
      fontSize: 57,
      fontWeight: FontWeight.bold,
      color: AppColors.neutral900,
    ),
    displayMedium: TextStyle(
      fontSize: 45,
      fontWeight: FontWeight.bold,
      color: AppColors.neutral900,
    ),
    headlineLarge: TextStyle(
      fontSize: 32,
      fontWeight: FontWeight.bold,
      color: AppColors.neutral900,
    ),
    titleLarge: TextStyle(
      fontSize: 22,
      fontWeight: FontWeight.w600,
      color: AppColors.neutral800,
    ),
    bodyLarge: TextStyle(fontSize: 16, color: AppColors.neutral700),
    bodyMedium: TextStyle(fontSize: 14, color: AppColors.neutral600),
    labelLarge: TextStyle(
      fontSize: 14,
      fontWeight: FontWeight.w600,
      color: Colors.white,
    ),
  ),

  // ButtonTheme defines the style for buttons
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      backgroundColor: AppColors.primary600,
      foregroundColor: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10), // Corresponds to --radius
      ),
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
      textStyle: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
    ),
  ),

  // CardTheme defines the style for cards
  cardTheme: CardThemeData(
    elevation: 4,
    shadowColor: AppColors.neutral200.withOpacity(0.5),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(12), // Corresponds to --radius-lg
    ),
    color: Colors.white,
  ),

  // InputDecorationTheme defines the style for text fields
  inputDecorationTheme: InputDecorationTheme(
    filled: true,
    fillColor: AppColors.neutral100,
    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10), // Corresponds to --radius
      borderSide: const BorderSide(color: AppColors.neutral300),
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: const BorderSide(color: AppColors.neutral300),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: const BorderSide(color: AppColors.primary500, width: 2),
    ),
    labelStyle: const TextStyle(color: AppColors.neutral500),
    hintStyle: const TextStyle(color: AppColors.neutral400),
  ),
);

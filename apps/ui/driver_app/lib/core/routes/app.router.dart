import "package:driver_app/screens/login/login.screen.dart";
import "package:go_router/go_router.dart";
import "package:driver_app/screens/home.screen.dart";

final appRouter = GoRouter(
  routes: [
    GoRoute(path: '/', builder: (context, state) => const HomeScreen()),
    GoRoute(path: '/login', builder: (context, state) => const LoginScreen()),
  ],
);

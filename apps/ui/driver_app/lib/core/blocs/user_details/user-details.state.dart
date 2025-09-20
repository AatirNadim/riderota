import 'package:driver_app/core/types/user-details.types.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class UserDetailsState extends Equatable {
  const UserDetailsState();
}

class UserDetailsInitialState extends UserDetailsState {
  @override
  List<Object> get props => [];
}

class UserDetailsLoadingState extends UserDetailsState {
  @override
  List<Object> get props => [];
}

class UserDetailsLoadedState extends UserDetailsState {
  final UserDetails userDetails;
  const UserDetailsLoadedState(this.userDetails);

  @override
  List<Object> get props => [userDetails];
}

class UserDetailsErrorState extends UserDetailsState {
  final String message;
  const UserDetailsErrorState(this.message);

  @override
  List<Object> get props => [message];
}


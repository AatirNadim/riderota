import 'package:driver_app/core/types/user-details.types.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class UserDetailsState extends Equatable {
  const UserDetailsState();
}

class UserDetailsInitial extends UserDetailsState {
  @override
  List<Object> get props => [];
}

class UserDetailsLoading extends UserDetailsState {
  @override
  List<Object> get props => [];
}

class UserDetailsLoaded extends UserDetailsState {
  final UserDetails userDetails;
  const UserDetailsLoaded(this.userDetails);

  @override
  List<Object> get props => [userDetails];
}

class UserDetailsError extends UserDetailsState {
  final String message;
  const UserDetailsError(this.message);

  @override
  List<Object> get props => [message];
}


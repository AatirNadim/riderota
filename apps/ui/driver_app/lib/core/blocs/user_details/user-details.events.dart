import 'package:driver_app/core/types/user-details.types.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class UserDetailsEvent extends Equatable {
  const UserDetailsEvent();
}

class LoadUserDetailsEvent extends UserDetailsEvent {
  final String userId;
  const LoadUserDetailsEvent(this.userId);

  @override
  List<Object> get props => [userId];
}

class UpdateUserDetailsEvent extends UserDetailsEvent {
  final UserDetails userDetails;
  const UpdateUserDetailsEvent(this.userDetails);

  @override
  List<Object> get props => [userDetails];
}

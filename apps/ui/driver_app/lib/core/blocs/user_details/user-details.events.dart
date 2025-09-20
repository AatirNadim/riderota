import 'package:driver_app/core/types/user-details.types.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';

@immutable
abstract class UserDetailsEvent extends Equatable {
  const UserDetailsEvent();
}

class LoadUserDetails extends UserDetailsEvent {
  final String userId;
  const LoadUserDetails(this.userId);

  @override
  List<Object> get props => [userId];
}

class UpdateUserDetails extends UserDetailsEvent {
  final UserDetails userDetails;
  const UpdateUserDetails(this.userDetails);

  @override
  List<Object> get props => [userDetails];
}

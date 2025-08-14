export class UserNotFoundError extends Error {
  constructor(message = "User not found or session expired.") {
    super(message);
    this.name = "UserNotFoundError";
  }
}

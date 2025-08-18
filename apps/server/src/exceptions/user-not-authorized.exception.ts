export class UserNotAuthorizedError extends Error {
  constructor(message = "User not authorized.") {
    super(message);
    this.name = "UserNotAuthorizedError";
  }
}

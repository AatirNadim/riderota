export class InviteTokenExpiredError extends Error {
  constructor(message = "Invite token has expired.") {
    super(message);
    this.name = "InviteTokenExpiredError";
  }
}

export class DatabaseConnectionError extends Error {
  constructor(public message: string) {
    super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}

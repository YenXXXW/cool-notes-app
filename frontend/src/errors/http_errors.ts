class HttpError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

/**
 * Status code: 401
 */
export class UnAuthorizedError extends HttpError {}

/**
 * status code: 409
 */
export class ConflictError extends HttpError {}

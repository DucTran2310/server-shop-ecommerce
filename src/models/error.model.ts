export class ErrorWithStatus {
  error?: boolean
  message: string
  status: number
  constructor({ error, message, status }: { error?: boolean; message: string; status: number }) {
    this.error = true
    this.message = message
    this.status = status
  }
}

// models/error.model.ts

export class UnprocessableEntityError extends Error {
  status: number;
  errors: any;

  constructor(response: { message: string; errors: any }) {
    super(response.message);
    this.status = 422; // Mã trạng thái HTTP cho Unprocessable Entity
    this.errors = response.errors || {};
    this.name = this.constructor.name;

    // Đảm bảo rằng stack trace sẽ có nếu lỗi xảy ra
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnprocessableEntityError);
    }
  }
}


export class UnauthorizedError extends ErrorWithStatus {
  // errors: ErrorType;
}

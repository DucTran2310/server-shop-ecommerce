import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '@constants/httpStatus.enum';
import { UnprocessableEntityError } from '@models/error.model';
import { USER_MESSAGE } from '@constants/messages.constant';

// Middleware validate
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Nếu có lỗi validation, trả về lỗi 422 với danh sách lỗi
    const errorResponse = {
      message: USER_MESSAGE.VALIDATION_ERROR,
      errors: errors.array(),
    };
    return next(new UnprocessableEntityError(errorResponse));
  }

  // Nếu không có lỗi validation, tiếp tục xử lý
  next();
};

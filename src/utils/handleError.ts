import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { sendErrorResponse } from './responseHelper';
import { HttpStatusCode } from '~/constants/httpStatus.enum';
import { USER_MESSAGE } from '~/constants/messages.constant';

const handleValidationErrors = (
  req: Request,
  res: Response,  // Không cần generic ở đây
  next: NextFunction
): void => {
  // Lấy kết quả của validation
  const errors = validationResult(req);

  // Nếu có lỗi từ registerValidate (express-validator)
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return sendErrorResponse(
      res,
      HttpStatusCode.BAD_REQUEST,
      USER_MESSAGE.VALIDATION_ERROR,
      errors
    );
  }

  // Kiểm tra nếu có lỗi khác ngoài validation, ví dụ lỗi từ service
  try {
    // Tiến hành xử lý tiếp theo trong controller nếu không có lỗi
    next();
  } catch (error) {
    // Nếu có lỗi không phải lỗi validate, trả về lỗi 500
    return sendErrorResponse(res, HttpStatusCode.INTERNAL_SERVER, 'Internal Server');
  }
};

export default handleValidationErrors;

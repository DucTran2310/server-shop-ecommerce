import { checkSchema, ParamSchema } from "express-validator"
import bcrypt from 'bcrypt';
import { USER_MESSAGE } from "~/constants/messages.constant";
import UserModel from "~/models/user.model";
import { ErrorWithStatus } from "~/models/error.model";
import { HttpStatusCode } from "~/constants/httpStatus.enum";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { sendErrorServer } from "~/utils/responseHelper";

// ===================================================VALIDATION===================================================
const nameSchema: ParamSchema = {
  isString: true,
  notEmpty: {
    errorMessage: USER_MESSAGE.NAME_IS_REQUIRED
  },
  trim: true,
  isLength: { options: { min: 1, max: 100 }, errorMessage: USER_MESSAGE.NAME_LENGTH_IS_INVALID }
}

const passwordSchema: ParamSchema = {
  isString: true,
  notEmpty: {
    errorMessage: USER_MESSAGE.PASSWORD_IS_REQUIRED
  },
  isLength: { options: { min: 6, max: 50 }, errorMessage: USER_MESSAGE.PASSWORD_LENGTH_INVALID },
  trim: true,
  isStrongPassword: {
    errorMessage: USER_MESSAGE.PASSWORD_MUST_BE_STRONG,
    options: {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    }
  }
}

const confirmPasswordSchema: ParamSchema = {
  isString: true,
  notEmpty: { errorMessage: USER_MESSAGE.CONFIRM_PASSWORD_IS_REQUIRED },
  isLength: { options: { min: 6, max: 50 }, errorMessage: USER_MESSAGE.CONFIRM_PASSWORD_LENGTH_INVALID },
  isStrongPassword: {
    errorMessage: USER_MESSAGE.CONFIRM_PASSWORD_MUST_BE_STRONG,
    options: {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    }
  },
  trim: true,
  custom: {
    options: (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error(USER_MESSAGE.CONFIRM_PASSWORD_INVALID)
      }

      return true
    }
  }
}
// ===================================================VALIDATION===================================================
export const registerValidate = checkSchema({
  name: nameSchema,
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
})

export const loginValidate = checkSchema({
  email: {
    isEmail: {
      errorMessage: USER_MESSAGE.EMAIL_IS_INVALID,
    },
    notEmpty: {
      errorMessage: USER_MESSAGE.EMAIL_IS_REQUIRED,
    },
    trim: true,
    custom: {
      options: async (values, { req }) => {
        const { password } = req.body;
        const user = await UserModel.findOne({ email: values });
        if (user === null) {
          throw new ErrorWithStatus({
            message: USER_MESSAGE.EMAIL_DOES_NOT_EXIST,
            status: HttpStatusCode.BAD_REQUEST,
          });
        }

        const isMatchPassword = await bcrypt.compare(password, user.password!);
        if (!isMatchPassword) {
          throw new ErrorWithStatus({
            message: USER_MESSAGE.EMAIL_OR_PASSWORD_IS_INCORRECT,
            status: HttpStatusCode.UNAUTHORIZED,
          });
        }

        req.user = user;
        return true;
      },
    },
  },
  password: passwordSchema,
}, ['body']);

export const refreshTokenValidate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.query;

  try {
    if (!id || typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
      throw new ErrorWithStatus({
        message: USER_MESSAGE.OBJECT_ID_INVALID,
        status: HttpStatusCode.BAD_REQUEST,
      });
    }

    const objectId = new mongoose.Types.ObjectId(id);

    const user = await UserModel.findById(objectId);
    if (!user) {
      throw new ErrorWithStatus({
        message: USER_MESSAGE.EMAIL_DOES_NOT_EXIST,
        status: HttpStatusCode.UNAUTHORIZED,
      });
    }

    req.user = user
    next();
  } catch (error) {
    sendErrorServer(res)
  }
};

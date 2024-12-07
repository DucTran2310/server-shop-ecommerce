import { NextFunction, Request, Response } from "express";
import { USER_MESSAGE } from "~/constants/messages.constant";
import usersService from "~/services/user.service";
import { sendSuccessResponse } from "~/utils/responseHelper";

const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, name, password, confirmPassword, photoUrl } = req.body;

  const userData = await usersService.register({
    email,
    name,
    password,
    photoUrl,
  });

  return sendSuccessResponse(res, userData, USER_MESSAGE.REGISTER_SUCCESS);
};


const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { user } = req;

  const dataUser = await usersService.login(user);
  return sendSuccessResponse(res, dataUser, USER_MESSAGE.LOGIN_SUCCESS);
};


const loginWithGoogle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const data = await usersService.loginWithGoogle(req)
  return sendSuccessResponse(res, data, USER_MESSAGE.LOGIN_SUCCESS);
}

const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.query;

  const { user } = req
  const token = await usersService.refreshToken(user);

  return sendSuccessResponse(res, token, USER_MESSAGE.REFRESH_TOKEN_SUCCESSFULLY);
};

export { login, loginWithGoogle, refreshToken, register };


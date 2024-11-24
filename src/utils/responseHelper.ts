import { Response } from "express";
import { HttpStatusCode } from "~/constants/httpStatus.enum";
import { DEFAULT_MESSAGE, SERVER_MESSAGE } from "~/constants/messages.constant";

export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  listError?: any
) => {
  res.status(statusCode).json({
    error: true,
    message,
    data: null,
    listError
  });
};

export const sendErrorServer = (
  res: Response
) => {
  res.status(HttpStatusCode.INTERNAL_SERVER).json({
    error: true,
    message: SERVER_MESSAGE.SERVER_ERROR,
    data: null,
  });
};

export const sendSuccessResponse = (
  res: Response,
  data: any,
  message = DEFAULT_MESSAGE.SUCCESS
) => {
  res.status(HttpStatusCode.OK).json({
    error: false,
    message,
    data,
  });
};

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ERROR_MESSAGE } from "~/constants/messages.constant";

// Extend the Request interface to include a possible _id field
interface CustomRequest extends Request {
  _id?: string;
}

export const verifyToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const headers = req.headers.authorization;
  const accessToken = headers ? headers.split(" ")[1] : "";

  try {
    if (!accessToken) {
      res.status(401).json({
        error: true,
        message: ERROR_MESSAGE.NOT_PERMISSION,
      });
      return;
    }

    const verify = jwt.verify(
      accessToken,
      process.env.SECRET_KEY as string
    ) as { _id: string };

    if (!verify) {
      res.status(401).json({
        error: true,
        message: ERROR_MESSAGE.NOT_PERMISSION,
      });
      return;
    }

    req._id = verify._id;

    next();
  } catch (error) {
    res.status(401).json({
      error: true,
      message: (error as Error).message
    });
  }
};
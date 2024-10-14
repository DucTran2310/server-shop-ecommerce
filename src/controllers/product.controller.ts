import { Request, Response, NextFunction } from "express";

const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    res.status(200).json({
      error: false,
      message: "Lấy danh sách sản phẩm thành công!",
      data: [],
    });
  } catch (error) {
    const err = error as Error;
    res.status(404).json({
      error: true,
      message: err.message,
    });
  }
};

export { getProducts };

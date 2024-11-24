import { NextFunction, Request, Response } from "express";
import { SUPPLIER_MESSAGE } from "~/constants/messages.constant";
import supplierService from "~/services/supplier.service";
import { sendSuccessResponse } from "~/utils/responseHelper";

const addNewSupplierController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const body = req.body;

  const data = await supplierService.addNewSupplier(body);

  return sendSuccessResponse(res, data, SUPPLIER_MESSAGE.ADD_NEW_SUPPLIER_SUCCESS);
};

export { addNewSupplierController };
import { NextFunction, Request, Response } from "express";
import { SUPPLIER_MESSAGE } from "~/constants/messages.constant";
import supplierService from "~/services/supplier.service";
import { sendSuccessResponse } from "~/utils/responseHelper";

const addNewSupplierController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const body = req.body;

  const data = await supplierService.addNewSupplier(body);

  return sendSuccessResponse(
    res,
    data,
    SUPPLIER_MESSAGE.ADD_NEW_SUPPLIER_SUCCESS
  );
};

const getListSuppliersController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { pageSize, page } = req.query;
  const data = await supplierService.getListSuppliers({ pageSize: Number(pageSize), page: Number(page) });

  return sendSuccessResponse(
    res,
    data,
    SUPPLIER_MESSAGE.GET_LIST_SUPPLIERS_SUCCESS
  );
};

const updateSupplierController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.query;
  const body = req.body;

  const data = await supplierService.updateSupplier(id as string, body);

  return sendSuccessResponse(
    res,
    data,
    SUPPLIER_MESSAGE.UPDATE_SUPPLIER_SUCCESS
  );
};

const deleteSupplierController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.query;

  const data = await supplierService.deleteSupplier(id as string);

  return sendSuccessResponse(
    res,
    data,
    SUPPLIER_MESSAGE.DELETE_SUPPLIER_SUCCESS
  );
};

export {
  getListSuppliersController,
  addNewSupplierController,
  updateSupplierController,
  deleteSupplierController,
};

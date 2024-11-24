import { Router } from "express";
import { addNewSupplierController } from "~/controllers/supplier.controller";
import { register } from "~/controllers/user.controller";
import { addNewSupplierValidate } from "~/middlewares/supplier.middleware";
import handleValidationErrors from "~/utils/handleError";

const router = Router()

router.post('/addNew', addNewSupplierValidate, handleValidationErrors, addNewSupplierController)

export default router
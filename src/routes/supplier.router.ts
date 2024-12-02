import { Router } from "express";
import { addNewSupplierController, deleteSupplierController, getListSuppliersController, updateSupplierController } from "~/controllers/supplier.controller";
import { addNewSupplierValidate, deleteSupplierValidate, updateSupplierValidate } from "~/middlewares/supplier.middleware";
import { verifyToken } from "~/middlewares/verifyToken.middleware";
import handleValidationErrors from "~/utils/handleError";

const router = Router()

router.post('/addNew', addNewSupplierValidate, handleValidationErrors, addNewSupplierController)
router.get('/getList', verifyToken, handleValidationErrors, getListSuppliersController)
router.put('/updateSupplier', verifyToken, updateSupplierValidate, handleValidationErrors, updateSupplierController)
router.delete('/deleteSupplier', verifyToken, deleteSupplierValidate, handleValidationErrors, deleteSupplierController)

export default router
import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { getProducts } from "~/controllers/product.controller";

const router = Router();

router.get("/get-products", verifyToken, getProducts);

export default router;

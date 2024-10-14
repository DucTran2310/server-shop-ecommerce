import { getProducts } from "@controllers/product.controller";
import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.get("/get-products", verifyToken, getProducts);

export default router;

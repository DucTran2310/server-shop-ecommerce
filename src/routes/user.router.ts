import { login, loginWithGoogle, refreshToken, register } from "@controllers/user.controller";
import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/google-login', loginWithGoogle)
router.get('/refresh-token', refreshToken )

export default router
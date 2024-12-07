import { Router } from "express";
import { login, loginWithGoogle, refreshToken, register } from "~/controllers/user.controller";
import handleValidationErrors from "~/utils/handleError";
import { loginValidate, refreshTokenValidate, registerValidate } from "../middlewares/user.middleware";

const router = Router()

router.post('/register', registerValidate, handleValidationErrors, register)
router.post('/login', loginValidate, handleValidationErrors, login)
router.post('/google-login', handleValidationErrors, loginWithGoogle)
router.get('/refresh-token', refreshTokenValidate, handleValidationErrors, refreshToken)

export default router
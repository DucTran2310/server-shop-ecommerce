import { Router } from "express";
import { login, loginWithGoogle, refreshToken, register } from "~/controllers/user.controller";
import handleRegisterValidationErrors from "~/utils/handleError";
import { loginValidate, refreshTokenValidate, registerValidate } from "../middlewares/user.middleware";

const router = Router()

router.post('/register', registerValidate, handleRegisterValidationErrors, register)
router.post('/login', loginValidate, handleRegisterValidationErrors, login)
router.post('/google-login', loginWithGoogle)
router.get('/refresh-token', refreshTokenValidate, handleRegisterValidationErrors, refreshToken)

export default router
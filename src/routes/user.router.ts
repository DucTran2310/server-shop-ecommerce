import { login, loginWithGoogle, register } from "@controllers/user.controller";
import { Router } from "express";

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/google-login', loginWithGoogle)

export default router
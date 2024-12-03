import * as authController from './controller/registration.js'
import { Router } from "express";
import { validation } from '../../middleware/validation.js';
import * as validators from './auth.validation.js'
const router = Router()




router.post('/signup', validation(validators.signup), authController.signup)

router.get('/confirmEmail/:token', validation(validators.token), authController.confirmEmail)
router.get('/NewConfirmEmail/:token', validation(validators.token), authController.requestNewConfirmEmail)


router.post('/login', validation(validators.login), authController.login)


router.patch("/sendCode",
    validation(validators.sendCode),
    authController.sendCode)
router.patch("/forgetPassword",
    validation(validators.forgetPassword),
    authController.forgetPassword)




export default router
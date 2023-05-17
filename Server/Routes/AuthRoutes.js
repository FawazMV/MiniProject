import express from 'express';
import { userLogin, userRegister } from '../Controllers/AuthControllers.js';
import upload from '../Helpers/Multer.js';
const router = express.Router();

router.post('/register', upload.single('image'), userRegister)

router.post('/login', userLogin)



export default router
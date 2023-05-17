import express from 'express';
import { deleteAccount, getProfile, updateDetails } from '../Controllers/ProfileControllers.js';
import authVeify from '../Helpers/JWT.js';
import upload from '../Helpers/Multer.js';
const router = express.Router()


router.get('/get-details', authVeify, getProfile)

router.put('/update-details', authVeify, upload.single('image'), updateDetails)

router.delete('/remove-account', authVeify, deleteAccount)

export default router
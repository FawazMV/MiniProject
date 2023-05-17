import express from 'express';
import { deleteAccount, getProfile, updateDetails, updateImage } from '../Controllers/ProfileControllers.js';
import authVeify from '../Helpers/JWT.js';
import upload from '../Helpers/Multer.js';
const router = express.Router()


router.get('/get-details', authVeify, getProfile)

router.patch('/image-upload', authVeify, upload.single('image'), updateImage)

router.put('/update-details', authVeify, updateDetails)

router.delete('/remove-account', authVeify, deleteAccount)

export default router
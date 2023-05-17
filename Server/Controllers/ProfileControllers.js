import { imageRemove } from "../Helpers/helper.js"
import UserModel from "../Models/UserModel.js"

export const getProfile = async (req, res, next) => {
    try {
        const data = await UserModel.findById(req.user.id, { password: 0 }).lean()
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

export const updateImage = async (req, res, next) => {
    try {
        if (!req.file) return res.status(500).json({ error: "image not found" })
        console.log(req.file)
        const user = await UserModel.findOneAndUpdate({ _id: req.user.id }, { $set: { image: req.file.filename } })
        if (user?.image) imageRemove(user.image)
        return res.status(200).json({ message: "profile picture updated successfully" })
    } catch (err) {
        next(err)
        console.log(err)
    }
}

export const updateDetails = async (req, res, next) => {
    try {
        const { userName, address, phone, pin } = req.body
        if (!userName || !address || !phone || !pin) return res.status(500).json({ error: "Fileds can't be empty" })
        await UserModel.updateOne({ _id: req.user.id }, { $set: { userName, address: { address, phone, pin } } })
        return res.status(200).json({ message: "profile updated successfully" })
    } catch (err) {
        console.log(err)
        next(err)
    }
}

export const deleteAccount = async (req, res, next) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.user.id)
        if (user?.image) imageRemove(user.image)
        return res.status(200).json({ message: "account deleted successfully" })
    } catch (err) {
        console.log(err)
        next(err)
    }
}
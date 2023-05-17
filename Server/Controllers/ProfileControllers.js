import { imageRemove } from "../Helpers/helper.js"
import UserModel from "../Models/UserModel.js"

export const getProfile = async (req, res, next) => {
    try {
        const data = await UserModel.findById(req.user.id, { username: 1, image: 1, address: 1 }).lean()
        res.status(200).json(data)
    } catch (err) {
        next(err)
    }
}

export const updateDetails = async (req, res, next) => {
    try {
        let { username, address, image } = req.body
        if (!username || !address) return res.status(500).json({ error: "Fileds can't be empty" })
        if (!image && !req.file) return res.status(500).json({ error: "Fileds can't be empty" })
        if (!image) image = req.file.filename
        await UserModel.updateOne({ _id: req.user.id }, { $set: { username, address, image } })
        return res.status(200).json({ message: "profile updated successfully" })
    } catch (err) {
        next(err)
    }
}

export const deleteAccount = async (req, res, next) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.user.id)
        if (user?.image) imageRemove(user.image)
        return res.status(200).json({ message: "account deleted successfully" })
    } catch (err) {
        next(err)
    }
}
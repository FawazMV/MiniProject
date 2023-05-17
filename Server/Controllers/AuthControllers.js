import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import UserModel from "../Models/UserModel.js";

export const userRegister = async (req, res, next) => {
    try {
        const { username, password, address } = req.body;
        if (!username || !password || !address || !req.file)
            return res.status(500).json({ error: "Some fields are missing" })
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({
            username, password: hashedPassword, address, image: req.file.filename
        })
        await newUser.save()
        res.status(201).json({ message: 'User saved successfully' })
    } catch (err) {
        next(err);
    }
}

export const userLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(401).json({ error: "Some fields are missing" })
        const user = await UserModel.findOne({ username })
        if (!user) return res.status(401).json({ message: "Invalid credentials." });
        const isMatch = await bcrypt.compare(req.body.password, user.password).catch(err => next(err))
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials.." });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.status(200).json({ token, "message": "user login successfully" });
    } catch (err) {
        next(err);
    }
}
import mongoose from 'mongoose'
const userSchema = new mongoose.Schema
    (
        {
            userName: {
                type: String,
                required: true,
                unique: true,
                trim: true
            },
            password: {
                type: String,
                required: true
            },

            image: {
                type: String,
            },
            address: {
                address: { type: String, required: true },
                phone: { type: Number, required: true },
                pin: { type: Number, required: true }

            }
        },
        {
            timestamps: true
        }
    )

const UserModel = mongoose.model('users', userSchema)

export default UserModel
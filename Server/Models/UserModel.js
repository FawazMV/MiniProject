import mongoose from 'mongoose'
const userSchema = new mongoose.Schema
    (
        {
            username: {
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
                type: String, required: true
            }
        },
        {
            timestamps: true
        }
    )

const UserModel = mongoose.model('users', userSchema)

export default UserModel
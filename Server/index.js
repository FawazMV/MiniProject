import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import connectDB from './Models/config.js'
import authRoutes from './Routes/AuthRoutes.js'
import profileRoutes from './Routes/ProfileRoutes.js'


const app = express() 
app.use(express.json(),cors())
app.use('/', authRoutes)
app.use('/profile', profileRoutes)

app.use((err, req, res, next) => {
    if (err.code === 11000) {
        return res.status(500).json({ error: 'Duplicate found' })
    } else if (err.name === "ValidationError") {
        return res.status(500).json({ error: err.message })
    }
    else return res.status(500).json({ error: "Internal server error", err: err })
})

connectDB()
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(9999, () => {
        console.log(`Server running on port 9999`);
    });
});
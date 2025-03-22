require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const authRouter = require('./routes/auth');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(authRouter);

const DB = process.env.MONGO_URI;
mongoose.connect(DB).then(() => console.log("✅ MongoDB Connection Successfully Established"))
.catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1); // Exit process if DB connection fails
});

// S

app.listen(PORT, "0.0.0.0" , () =>{
    console.log(`Server is running on port http://localhost:${PORT}`);
});
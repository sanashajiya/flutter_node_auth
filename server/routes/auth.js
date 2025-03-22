const express = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const authRouter = express.Router();

// Sign Up
authRouter.post("/api/signup", async (req, res) =>{
    try{
        const { name, email, password } = req.body;
        const exisitingUser = await User.findOne({ email });
        if(exisitingUser){
            return res.status(400).json({msg: "User with same email and password already exists!"});
        }
        const hashedPassword = await bcryptjs.hash(password, 8);
        let user = new User({
            email,
            password: hashedPassword,
            name             
        });
        user = await user.save();
        res.json(user);
    }
    catch(e){
        res.status(500).json({erroe: e.message});
    }
});

module.exports = authRouter;
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken")

const router = express.Router();

router.post("/register", async (req,res)=>{

    const {name,email,password,role} = req.body;

    try{

        const existingUser = await User.findOne({ email });

        if(existingUser){

            return res.send("User already exists");

        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({

            name,
            email,
            password: hashedPassword,
            role

        });

        await user.save();

        res.send("User Registered");

    }

    catch(error){

        console.log(error);

    }

});


router.post("/login", async (req,res)=>{

    const {email,password} = req.body;

    try{

        const user = await User.findOne({ email });

        if(!user){

            return res.send("User not found");

        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){

            return res.send("Invalid credentials");

        }

        const token = jwt.sign(

            { id:user._id },

            process.env.JWT_SECRET,

            { expiresIn:"7d" }

        );

        res.json({

            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }

        });

    }

    catch(error){

        console.log(error);

    }

});
module.exports = router;
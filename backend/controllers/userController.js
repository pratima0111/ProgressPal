const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @description  Register new user
// @route        POST /api/user
// @access       Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)     //bad request
        throw new Error('Please add all fields')
    }

    //Check if user exists
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //Create User
    const user = await User.create({
        name, 
        email, 
        password: hashedPassword,
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name:user.name,
            email:user.name,
            password:hashedPassword,
            token: generateToken(user._id)

        })
    }else{
        res.status(400)
        throw new Error('Invalid user')
        
    }

    res.json({message:"Register User"})
})

// @description  Authenticate a user
// @route        POST /api/user/login
// @access       Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password } = req.body;

        //check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @description  Get user data
// @route        GET /api/user/me
// @access       Private
const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id:_id,
        name,
        email
    })
    // res.json({message:"User data display"})
})

//Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:'30d'         //expires in 30 days
        }
    )
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}
const users = require('../models/index').users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


async function signup(req,res,next) {
    const {userId, password, tel, nickname} = req.body;

    try{
        if(!userId || !password || !tel || !nickname){
            return res.status(400).json({
                message: 'please provide necessary info'
            })
        }
        if(password.length < 8){
            return res.status(400).json({
                message: 'password must be at least 8 characters long'
            })
        }

        const existingUser = await users.findOne({where :{userId : userId}}); 
        if(existingUser){
            return res.status(400).json({
                message : `user with id ${userId} already exists`
            })
        } 
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = {
            userId,
            password : hashedPassword,
            tel,
            nickname
        }
        const createdUser = await users.create(newUser);
        res.status(201).json({
            message: 'user created successfully',
            user : newUser
        })
    }
    catch(err){
        err.message = 'an error happened while registering user'
        next(err)
    }
}

async function login(req,res,next){
    const {userId,password} = req.body;
    if(!userId || !password){
        return res.status(400).json({
            message: 'please provide all necessary info'
        })
    }
    try{
        const existingUser = await users.findOne({where: {userId : userId}});
        if(!existingUser){
            return res.status(400).json({
                message: 'email or password is incorrect'
            })
        }
        const storedPassword = existingUser.password;
        const comparePasswords = await bcrypt.compare(password, storedPassword);
        if(!comparePasswords){
            return res.status(400).json({
                message: 'email or password is incorrect'
            })
        }
        const token = jwt.sign({
            userId : existingUser.userId,
            userNickname: existingUser.nickname,
        }, process.env.JWT_KEY)

        return res.status(200).json({
            token,
            nickname: existingUser.nickname
        })

    }catch(err){
        err.message = 'unable to login'
        next(err)
    }
}


function verifyToken(req,res,next){
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    try{
        const user = jwt.verify(token, process.env.JWT_KEY);
        req.user = user;
        next();
    }catch(err){
        err.message = 'not authorized to access'
        throw err
    }
}


module.exports = {
    signup,login, verifyToken
}

import { Request, Response } from 'express'
import prisma from '../db'
import { comparePasswords, createJWT, hashPassword } from '../modules/auth'

export const createNewUser = async (req:any, res:any, next) => {
    try{
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password)
            }
        })   
        const token = createJWT(user)
        res.json({ token })
    } catch(e){
        // if your product is an api then you need to be cautious about if 
        // your error is due to server connection or bad input by user
        // link to the documentation which talks about the error status 
        e.type = 'input' //erro type set to bad input
        next(e)
    }
}

export const signin = async (req:Request, res:Response) => {
    const user = await prisma.user.findUnique({
        where:{
            username: req.body.username
        }
    })

    if (!user) {
        res.status(401).json({ message: "User not found" });
        return;
    }

    const isValid = await comparePasswords(req.body.password, user.password)

    if(!isValid){
        res.status(401)
        res.json({message: "Nope"})
        return
    }

    const token = createJWT(user)
    res.json({token})
}
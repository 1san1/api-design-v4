import jwt from 'jsonwebtoken'
import { token } from 'morgan'
import bcrypt from 'bcrypt'


export const comparePasswords = (password: string, hash: string) => {
    return bcrypt.compare(password, hash);
}

export const hashPassword = (password: string) => {
    return bcrypt.hash(password, 5);
} 

// since we are creating JWT we need something unique
// about user well user Id can be unique id we want to keep 
// JWT light so that payload from client to server is small

export const createJWT = (user:any) => {
    const token = jwt.sign({
        id: user.id, 
        username: user.username
    }, 
        process.env.JWT_SECRET as string
    )
    return token

}

// the appropriate place for storing JWT in client side is
// storing it in a cookie because cookies are already send up
// and if stored in local storage it is tedious to send
// but on the server side they actually prefer the token to be on 
// authorization header which means it will probably in local storage

export const protect = (req:any, res:any, next:any) => {
    // express lowercases all the headers so that we don't have to
    const bearer = req.headers.authorization
    // bearer is generic way of describing someone having the ability to send up token
    // token can be of any type jwt, api Key, access token etc

    if(!bearer){
        res.status(401)
        // 401 is status code for not authorized
        res.json({message: 'not authorized'})
        return
    }

    const [, token] = bearer.split(' ') //"Bearer lskajdflajsfdlfjlkdsfj" we are splitting because token is on second index after spliting
    if(!token){
        res.status(401)
        res.json({message: 'not valid token'})
        return
    }

    // *****************important***********************
    // we use try catch block because we don't want our server to break because 
    // some client messed making server down for other users too imagine server crashing 
    // because someone forgot there password
    try{
        const user = jwt.verify(token, process.env.JWT_SECRET as string)

        req.user = user
        // if it is the user then it will attach with request object and goes further
        next()
    } catch (e){
        console.error(e)
        res.status(401)
        res.json({message: 'not valid token'})
        return
    }
}

// can we use api for rate limiting using middleware
// yes we can do it in middleware but we don't want it to even
// reach the server such that it won't use server resources
// so handling of ratelimiter is done before the api
// technically it is like middleware but middleware on a 
// network layer and not on code layer like proxy or api gateway which is another that
// sits infront of your server and that performs operation like rate limiting and access control
// this is whole another thing and there are products which only just does that 
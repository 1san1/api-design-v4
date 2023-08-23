import express from "express"
import router from "./router";
import morgan from 'morgan'
import cors from 'cors';
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";

// https://hendrixer.github.io/API-design-v4/

// **************cors**********************
// cors allows us to prevent different IP addresses or different 
// request that have specific headers or different type of methods from interacting
// but it doesn't tell you who the person is what role they might have and if there 
// is on good standing or not
// cors only tells whether the given request is allowed or not
// browser sends off API call to server ahead of time and make sure whether the requested client is allowed 
// to talk to that particular server and server will respond with CORS option and based on the things that
// are allowed then if browswer is assured the request is allowed browser sends off the request
// so it makes two request

// as our database is multi tenants i.e single Database is use to store information about multiple 
// users so to make sure that one user is allowed the data only related to that user only and not of 
// other user then we use authentication

// *********************JWT********************************
// javascript object is converted into random string given a secret key and that random string is converted into same string 
// given the same secret key
// we do this because we don't have to store anything in the server

// ****************session***********************
// the alternative to JWT will be a session we have to keep track of who is logged in API right now and we need to 
// do session management

// where as with JWT the client stores the JWT and send it at every single request because the server gonna check at every single request
// but wont require session management and storage
const app = express()

// the list below are middleware from morgan to exress.urlencoded
// for middleware use next()
app.use(morgan('dev'))
app.use(express.json())//this allows client to send json
app.use(express.urlencoded({extended: true}))

// 'google.com?a=1,thing=otherthing'url encoded will separate the query part and put it in separat object for you`
// middleware can be added whereever we want 

app.get("/", (req, res, next) => {
    // console.log("hello from express");
    // res.status(200)
    // res.json({message: 'hello'})
    
    // throw new Error('hello')

    // setTimeout(()=> {
    //     // if we pass anything to pass it treats it like an error
    //     next(new Error('hello'))
    // }, 1)

    res.json({message: "hello"})
})

// here the protect is middleware before we can access anything it goes through protect
app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signin)



//***************error handler******************* */
// we write error handler at the bottom because if the above routing procedure doesnot respond
// then only the error below should respond
// the code below is for synchronous error
// you should think about why would something break and handle it using try catch block

app.use((err, req, res, next) => {
    if(err.type === 'auth'){
        res.status(401).json({message: "unauthorized"})
    }else if(err.type === 'input'){
        res.status(400).json({message: 'invalid input'})
    }else {
        res.status(500).json({message: 'oops thats on us'})
    }
})

export default app

// ENVIRONMENT is a set of conditions in which your code runs in for eg like development mode and production mode

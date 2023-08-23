// blocking
// this is blocking code because js doesnot go to 
// next line until the first line has completed
const me = 'scott'
// this won't block because its execution is instant but if some heavy computation 
// in server side if one request is taking too long how will you serve other request
// one way to is make it async
// often people use synchronous version of file system 
console.log(me)

// blocking import fs from "fs";

// const fs = require('fs')
// const path = require('path')
// const result = fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8');
// console.log(result)
// console.log("hi")

//fs with promise
const fs = require('fs/promises')
const path = require('path')
const read = async() => {
    const result = fs.readFile(path.join(__dirname, 'package.json'), 'utf-8')
    return result
}
read().then(f => console.log(f))
console.log("hi")

// use async for anything that is CPU intensive
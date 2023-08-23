import { isMainThread } from 'worker_threads'
import * as user from '../user'
// describe('user handler', () => {
//     // here the desciption inside the "it" should be such that when we see
//     // we can make sure what we are actually expecting
//     it('should do something when something happens', () => {
//         expect(1).toBe(1)
//     })
// })


describe('user handler', () => {
// you shoudnot use hosted database for testing it can be expensive instead 
// use local database you can use "beforeALL", "afterEach" before running the test
// every test should be stateless and non reliant
    it('should create a new user',async () => {
        const req = {body: {username: 'hello', password: 'hi'}}
        const res = {json({token}){
            expect(token).toBeTruthy()
        }} 

        await user.createNewUser(req, res, () => {})
    })
})

import {Router} from 'express'
import {body, oneOf, validationResult} from 'express-validator'
import { checkServerIdentity } from 'tls'
import { handleInputErrors } from './modules/middleware'
import { createProduct, deleteProduct, getOneProduct, getProducts } from './handlers/product'
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update'


const router = Router()

// product

router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)

// the middleware body('name') from express-validator checks
// the req.body which is an object should have field name on it
// this express-vaidators doesnt log the error automatically but 
// it gives us the control of validating
router.put('/product/:id', body('name').isString(), handleInputErrors, (req, res) => {
    
})
router.post('/product', body('name').isString(), handleInputErrors, createProduct)
router.delete('/product/:id', deleteProduct)


// update
router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id', 
body('title').optional(), 
body('body').optional(), 
body('status').isIn(['IN_PROGRESS','SHIPPED','DEPRECATED']), 
body('version').optional(), 
updateUpdate)
router.post('/update',
body('title').exists().isString(),
body('body').exists().isString(),
body('productId').exists().isString(),
createUpdate)
router.delete('/update/:id', deleteUpdate)


//update point

router.get('/updatepoint', () => {

})
router.get('/updatepoint/:id', () => {
    
})
router.put('/updatepoint/:id', 
body('name').optional().isString(), 
body('description').optional().isString(), 
() => {
    
})
router.post('/updatepoint', 
body('name').optional().isString(),
body('description').optional().isString(),
body('updateId').exists().isString()
,() => {
    
})
router.delete('/updatepoint/:id', () => {
    
})


router.use((err, req, res, next)=>{
    console.log(err)
    res.json({message: 'in router handler'})
})
// difference between put and patch is put will update etirety of that id 
// where as patch only update the properties you send out

// GRPC or REST

export default router
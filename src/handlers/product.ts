import { SourceMap } from "module"
import prisma from "../db"

//Get all
export const getProducts = async (req:any, res:any) => {
    const user = await prisma.user.findUnique({
        where:{
            id: req.user.id
        },
        include: {
            products: true
        }
    })
    res.json({data: user?.products})
}

//Get one
export const getOneProduct = async (req:any, res:any) => {
    const id = req.params.id

    const product = await prisma.product.findUnique({
        where:{
            id,
            belongsToId: req.user.id
        }
    })
    res.json({data: product})
}



export const createProduct = async (req: any, res:any, next)=> {
    try{
        const product = await prisma.product.create({
            data:{
                name: req.body.name,
                belongsToId: req.user.id
            }
        })
        res.json({data: product})
    }catch(e){
        next(e)
    }
    //You have to go scenario by scenario and think about why it might
    // throw an error and try to catch that error figure what the error type
    // would be and then report it collect it log it appropriately
    // creating error handling system is tediou but is easier before writing the code
    // when we talk about transaction its other different thing when doing transaction we
    // need to see the log for what kind of error actually happened because some
    // error require you to roll back and some wont
}

export const updateProduct = async (req:any, res:any) => {
    const updated = await prisma.product.update({
        where:{
            id_belongsToId:{
                id: req.params.id,
                belongsToId: req.user.id
            }
        },
        data:{
            name: req.body.name
        }
    })
    res.json({data: updated})
}

export const deleteProduct = async (req:any, res:any) => {
    const deleted = await prisma.product.delete({
        where:{
            id_belongsToId:{
                id: req.params.id,
                belongsToId: req.user.id
            }
        }
    })
    res.json({data:deleted})
}
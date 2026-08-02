const Product = require('../models/product')

const create = async (req, res) => {
     try {
        const createdProduct = await Product.create(req.body)
        res.status(201).json(createdProduct)
    } catch (error) {
        res.status(400).json({ message: error.message })
    } 
}


module.exports = {
    create,
}

//  try {
        
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
const Product = require('../models/product')

const create = async (req, res) => {
     try {
        const createdProduct = await Product.create(req.body)
        res.status(201).json(createdProduct)
    } catch (error) {
        res.status(400).json({ message: error.message })
    } 
}

const index = async (req, res) => {
    try {
        // Sorts by newest first
        const products = await Product.find().sort({ createdAt: -1 })
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const show = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const update = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            req.body,
            { new: true,} 
        )

        // Check if found FIRST before sending a 200 response
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' })
        }

        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId)

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' })
        }

        res.status(200).json(deletedProduct)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    create,
    index,
    show,
    update,
    deleteProduct,
}

//  try {
        
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
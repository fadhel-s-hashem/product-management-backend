// server.js
const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"])

require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')

// the import for conttrolers
const productCtrl = require('./controllers/product')

const app = express()

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name} 🥭`)
})

// this line allows our React Front End permission to connect to our backend
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Product Management API' })
})

app.post('/products', productCtrl.create)
app.get('/products', productCtrl.index)
app.get('/products/:productId', productCtrl.show)
app.put('/products/:productId', productCtrl.update)
app.delete('/products/:productId', productCtrl.deleteProduct)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`The express app is running on port ${port}`)
})

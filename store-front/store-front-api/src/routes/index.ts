import express from 'express'
import orders from './api/orders'
import products from './api/products'
import users from './api/users'

const routes = express.Router()

routes.use('/users', users)
routes.use('/products', products)
routes.use('/orders', orders)

export default routes

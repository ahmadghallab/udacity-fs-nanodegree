import express, { Request, Response } from 'express'
import { ProductModel } from '../../models/products';
import dotenv from 'dotenv'
import { validateRequest } from '../../middlewares/validate-request';
import { createProductValidationRules } from '../../rules/validation-rules';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';

dotenv.config()

const product = new ProductModel();
const products = express.Router()

// Products index
products.get('/', async (req: Request, res: Response) => {  
  const result = await product.index();
  return res.status(200).json({
    status: true,
    message: 'Products list',
    data: result
  })
})

// Show product by id
products.get('/:id', async (req: Request, res: Response) => {
  const id = (req.params.id as unknown) as number
  const result = await product.show(id);
  return res.status(200).json({
    status: true,
    message: 'Products by id',
    data: result
  })
})

// Create product
products.post(
  '/', 
  currentUser,
  requireAuth,
  createProductValidationRules,
  validateRequest,
  async (req: Request, res: Response) => {

  const result = await product.create({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  });

  return res.status(201).json({
    status: true,
    message: 'Product created successfully',
    data: result
  })
})

export default products
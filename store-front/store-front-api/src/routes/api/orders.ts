import express, { Request, Response } from 'express'
import { OrderModel } from '../../models/orders';
import dotenv from 'dotenv'
import { validateRequest } from '../../middlewares/validate-request';
import { createOrderValidationRules } from '../../rules/validation-rules';
import { currentUser } from '../../middlewares/current-user';
import { requireAuth } from '../../middlewares/require-auth';

dotenv.config()

const order = new OrderModel();
const orders = express.Router()

// Current order by user
orders.get(
  '/current-by-user', 
  currentUser,
  requireAuth, 
  async (req: Request, res: Response) => {

  const result = await order.currrentOrderByUser((req.currentUser!.id as unknown) as number);
  return res.status(200).json({
    status: true,
    message: 'Current order by user',
    data: result || null
  })
  
})

// Create order
orders.post(
  '/', 
  currentUser,
  requireAuth,
  createOrderValidationRules,
  validateRequest,
  async (req: Request, res: Response) => {

    console.log(req.currentUser!.id);
    

  const result = await order.create({
    product_id: req.body.product_id,
    user_id: (req.currentUser!.id as unknown) as number,
    quantity: req.body.quantity
  });

  return res.status(201).json({
    status: true,
    message: 'Order created successfully',
    data: result
  })
})

export default orders
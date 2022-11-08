import supertest from "supertest";
import app from "..";
import { OrderModel } from "../models/orders";
import { ProductModel } from "../models/products";
import { UserModel } from "../models/users";
// @ts-ignore
import Client from "../database";

const request = supertest(app)

describe('Test endpoint responses', () => {
  it('gets the current order by user endpoint', async () => {
    const response = await request.get('/api/orders/current-by-user')
    expect(response.status).toBe(401)
  })
})

const user = new UserModel();
const product = new ProductModel();
const order = new OrderModel();

describe('Order Model', () => {

  beforeAll(async () => {
    await user.create({
      email: 'ahmadghallab@gmail.com',
      first_name: 'Ahmad',
      last_name: 'Ghallab',
      password: '123456'
    });
    await product.create({
      name: 'product 1',
      price: 5
    })
  });
  
  afterAll(async () => {
    // @ts-ignore
    const conn = await Client.connect();
    const sql = 'DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\n DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\n';
  
    await conn.query(sql);
    conn.release();
  })
  
  it('should have an current order by user method', () => {
    expect(order.currrentOrderByUser).toBeDefined();
  });

  it('create method should create an order', async () => {
    const result = await order.create({
      product_id: 1,
      user_id: 1,
      quantity: 5
    });
    expect(result).toEqual({
      id: 1,
      product_id: 1,
      user_id: 1,
      quantity: 5,
      status: "active"
    });
  });

  it('should return current active order by user', async () => {
    const result = await order.currrentOrderByUser(1);
    expect(result).toEqual({
      id: 1,
      product_id: 1,
      quantity: 5
    });
  });
})
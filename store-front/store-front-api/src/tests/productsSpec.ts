import supertest from "supertest";
import app from "..";
import { ProductModel } from "../models/products";
// @ts-ignore
import Client from "../database";

const request = supertest(app)

describe('Test endpoint responses', () => {
  it('gets the index endpoint', async () => {
    const response = await request.get('/api/products')
    expect(response.status).toBe(200)
  })
})

const product = new ProductModel();

describe('Product Model', () => {

  afterAll(async () => {
    // @ts-ignore
    const conn = await Client.connect();
    const sql = 'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;';
  
    await conn.query(sql);
    conn.release();
  })

  it('should have an index method', () => {
    expect(product.index).toBeDefined();
  });

  it('index method should return a list of products', async () => {
    const result = await product.index();
    expect(result).toEqual([]);
  })

  it('create method should add an product', async () => {
    const result = await product.create({
      name: 'product 1',
      price: 5
    });
    expect(result).toEqual({
      id: 1,
      name: 'product 1',
      price: 5,
      category: null
    });
  });

  it('index method should return a list of products', async () => {
    const result = await product.index();
    expect(result).toEqual([{
      id: 1,
      name: 'product 1',
      price: 5,
      category: null
    }]);
  });

  it('show method should return the correct product', async () => {
    const result = await product.show(1);
    expect(result).toEqual({
      id: 1,
      name: 'product 1',
      price: 5,
      category: null
    });
  });
})
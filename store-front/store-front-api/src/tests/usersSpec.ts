import supertest from "supertest";
import app from "..";
import { UserModel } from "../models/users";
// @ts-ignore
import Client from "../database";

const request = supertest(app)

describe('Test endpoint responses', () => {
  it('gets the index endpoint', async () => {
    const response = await request.get('/api/users')
    expect(response.status).toBe(401)
  })
})

const user = new UserModel();

describe('User Model', () => {

  afterAll(async () => {
    // @ts-ignore
    const conn = await Client.connect();
    const sql = 'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
  
    await conn.query(sql);
    conn.release();
  })

  it('should have an index method', () => {
    expect(user.index).toBeDefined();
  });

  it('index method should return a list of users', async () => {
    const result = await user.index();
    expect(result).toEqual([]);
  })

  it('create method should add an user', async () => {
    const result = await user.create({
      email: 'ahmadghallab@gmail.com',
      first_name: 'Ahmad',
      last_name: 'Ghallab',
      password: '123456'
    });
    expect(result).toEqual({
      id: 1,
      email: 'ahmadghallab@gmail.com',
      first_name: 'Ahmad',
      last_name: 'Ghallab'
    });
  });

  it('index method should return a list of users', async () => {
    const result = await user.index();
    expect(result).toEqual([{
      id: 1,
      email: 'ahmadghallab@gmail.com',
      first_name: 'Ahmad',
      last_name: 'Ghallab'
    }]);
  });

  it('show method should return the correct user', async () => {
    const result = await user.show(1);
    expect(result).toEqual({
      id: 1,
      email: 'ahmadghallab@gmail.com',
      first_name: 'Ahmad',
      last_name: 'Ghallab'
    });
  });
})
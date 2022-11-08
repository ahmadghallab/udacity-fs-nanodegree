// @ts-ignore
import Client from "../database";
import { Password } from "../services/password";

export type User = { 
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  password?: string;
}

export class UserModel {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT id, email, first_name, last_name FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get users ${err}`)
    }
  }

  async show(id: number): Promise<User> {
    try {
    const sql = 'SELECT id, email, first_name, last_name FROM users WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  async create(b: User): Promise<User> {
    try {
      const sql = 'INSERT INTO users (first_name, email, last_name, password) VALUES($1, $2, $3, $4) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()

      const hashedPassword = await Password.toHash(b.password!)

      const result = await conn.query(sql, [b.first_name, b.email, b.last_name, hashedPassword])

      const { password, ...user } = result.rows[0];

      conn.release()

      return user
    } catch (err) {
      throw new Error(`Could not add new user. Error: ${err}`)
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [id])

      const { password, ...user } = result.rows[0];

      conn.release()

      return user
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`)
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
    const sql = 'SELECT id, email, first_name, last_name, password FROM users WHERE email=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [email])

    conn.release()

    if (result.rows.length) {
      return result.rows[0]
    } else {
      return null
    }

    } catch (err) {
      throw new Error(`Could not find user ${email}. Error: ${err}`)
    }
  }
}
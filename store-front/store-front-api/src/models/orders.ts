// @ts-ignore
import Client from "../database";

export type Order = {
  id?: number;
  product_id: number;
  user_id?: number;
  quantity: number;
  status?: string;
}

export class OrderModel {

  async currrentOrderByUser(user_id: number): Promise<Order> {
    try {
    const sql = 'SELECT id, product_id, quantity FROM orders WHERE user_id=($1) AND status=($2)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [user_id, 'active'])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find current order for user ${user_id}. Error: ${err}`)
    }
  }

  async create(b: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO orders (user_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [b.user_id, b.product_id, b.quantity])

      const product = result.rows[0]

      conn.release()

      return product
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err}`)
    }
  }
}
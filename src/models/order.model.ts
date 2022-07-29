import { Pool } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async list(): Promise<Order[]> {
    const query = `SELECT orders.id, userId, GROUP_CONCAT(DISTINCT products.id) AS productsIds
    FROM Trybesmith.Orders AS orders INNER JOIN Trybesmith.Products AS products
    ON products.orderId = orders.id
    GROUP BY orders.id
    ORDER BY userId`;

    const result = await this.connection.execute(query);
    const [rows] = result;

    return rows as Order[];
  }
}

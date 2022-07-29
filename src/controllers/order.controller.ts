import { Request, Response } from 'express';
import OrderService from '../services/order.service';

export default class OrderController {
  constructor(private orderService = new OrderService()) { }

  public list = async (req: Request, res: Response) => {
    const orders = await this.orderService.list();
    const newArray = orders.map(({ id, userId, productsIds }) => ({
      id,
      userId,
      productsIds: productsIds.split(',').map((productId) => Number(productId)),
    }));
    res.status(200).json(newArray);
  };
}

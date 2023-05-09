import { Request, Response } from "express";
import {Order} from "../common/interfaces/interfaces";
import {RestaurantService} from "../services/restaurant.service";

export class RestaurantController {

  public async createAndProcessOrders(req: Request, res: Response) {
    try {
    const orders: Order[] = req.body;
    const restaurantService = new RestaurantService();
    await restaurantService.processOrders(orders);
    res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

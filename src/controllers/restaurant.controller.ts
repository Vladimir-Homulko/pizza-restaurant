import { Request, Response } from "express";
import {Order} from "../common/interfaces/interfaces";
import {RestaurantService} from "../services/restaurant.service";

export class RestaurantController {

  constructor(private restaurantService: RestaurantService) {
    this.restaurantService = restaurantService;
  }

  public async createAndProcessOrders(req: Request, res: Response) {
    try {
    const orders: Order[] = req.body;
    await this.restaurantService.processOrders(orders);
    res.sendStatus(200);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

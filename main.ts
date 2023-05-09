import dotenv from "dotenv";
import express, { Express } from "express";
import bodyParser from "body-parser";
import {RestaurantController} from "./src/controllers/restaurant.controller";
import * as mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT;
const app: Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const restaurantController = new RestaurantController();

app.post('/', restaurantController.createAndProcessOrders);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      // authSource: 'admin',
    });
    app.listen(PORT, () => console.log(`Started on ${PORT} port...`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();


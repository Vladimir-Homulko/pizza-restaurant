import {Order} from "../common/interfaces/interfaces";
import {KitchenService} from "./kitchen.service";
import {AdministratorService} from "./administrator.service";
import {ReportModel} from "../models/report.schema";

export class RestaurantService {

  private kitchenService: KitchenService;
  private readonly administratorService: AdministratorService;

  constructor() {
    this.administratorService = new AdministratorService();
    this.kitchenService = new KitchenService(this.administratorService);
    this.administratorService.waitFinishedOrder(this.orderReport);
  }

  public async processOrders(orders: Order[]) {
    const timeStart = Date.now();
    for (let i = 0; i < orders.length; i++) {
      await this.kitchenService.processOrder(orders[i], i + 1);
    }
    const timeEnd = Date.now();
    await this.saveGlobalReport(timeStart, timeEnd);
    this.printGlobalReport(timeStart, timeEnd);

  }

  private orderReport(orderId: number, timeStart: number, timeEnd: number) {
    const start = new Date(timeStart).toLocaleTimeString();
    const end = new Date(timeEnd).toLocaleTimeString();
    console.log(`Order: ${orderId} - preparation time start: ${start}, preparation time end: ${end}`);
  }

  private printGlobalReport(timeStart: number, timeEnd: number) {
    const start = new Date(timeStart).toLocaleTimeString();
    const end = new Date(timeEnd).toLocaleTimeString();
    console.log(`All orders - preparation time start: ${start}, preparation time end: ${end}`);
  }

  private async saveGlobalReport(timeStart: number, timeEnd: number) {
    const ordersReports = this.administratorService.getOrdersReports();
    const newReport = new ReportModel({
      timeStart,
      timeEnd,
      ordersReports,
    });
    await newReport.save();
  }
}

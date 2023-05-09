import EventEmitter from "events";
import {OrderReport} from "../common/interfaces/interfaces";

export class AdministratorService {
  private emitter: EventEmitter;
  private ordersReports: OrderReport[] = [];

  constructor() {
    this.emitter = new EventEmitter();
  }

  public finishOrder(reportData: OrderReport) {
    this.ordersReports.push(reportData)
    this.emitter.emit('finishOrder', reportData);
  }

  public waitFinishedOrder(action: (orderId: number, timeStart: number, timeEnd: number) => void) {
    this.emitter.on('finishOrder', (reportData: OrderReport) => {
      action(reportData.orderId, reportData.timeStart, reportData.timeEnd);
    });
  }

  public getOrdersReports(): OrderReport[] {
    return this.ordersReports;
  }

  public cleanOrderReports(): void {
    this.ordersReports = [];
  }

}

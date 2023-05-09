import {Order, PizzaContext} from "../common/interfaces/interfaces";
import {DoughZoneService} from "./dough-zone.service";
import {ToppingZoneService} from "./topping-zone.service";
import {OvenZoneService} from "./oven-zone.service";
import {WaiterZoneService} from "./waiter-zone.service";
import {PizzaStatus} from "../common/enums/pizza-status.enum";
import {AdministratorService} from "./administrator.service";
import {KitchenZoneService} from "./kitchen-zone.service";

export class KitchenService {

  private readonly administratorService: AdministratorService;
  private kitchenFlow: KitchenZoneService;

  constructor(administratorService: AdministratorService) {
    this.administratorService = administratorService;
    this.kitchenFlow = this.buildKitchenFlow();
  }

  public async processOrder(order: Order, orderId: number) {
    const pizzaContext: PizzaContext = {
      orderId,
      pizzaInput: {
        toppings: order.toppings,
      },
      pizzaOutput: {
        toppings: [],
        status: PizzaStatus.READY_FOR_DOUGH,
        timeStart: 0,
        timeEnd: 0,
      },
    }
    const tasks = this.kitchenFlow.createTasks(pizzaContext);
    await this.kitchenFlow.enqueue(pizzaContext, tasks);
  }

  private buildKitchenFlow(): KitchenZoneService {
    const waiterZoneService = new WaiterZoneService(this.administratorService);
    const ovenZoneService = new OvenZoneService(waiterZoneService, this.administratorService);
    const toppingZoneService = new ToppingZoneService(ovenZoneService, this.administratorService);
    return new DoughZoneService(toppingZoneService, this.administratorService);
  }

}

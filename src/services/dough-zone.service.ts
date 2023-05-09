import {KitchenZoneService} from "./kitchen-zone.service";
import {PizzaContext, Task} from "../common/interfaces/interfaces";
import {PizzaStatus} from "../common/enums/pizza-status.enum";
import {AdministratorService} from "./administrator.service";

export class DoughZoneService extends KitchenZoneService {

  constructor(nextZone: KitchenZoneService, administratorService: AdministratorService) {
    super(2, 1, nextZone, administratorService);
  }

  createTasks(pizzaContext: PizzaContext): Task<PizzaContext>[] {
    const task: Task<PizzaContext> = {
      execute: async () => {
        console.time(`Order ${pizzaContext.orderId} preparing dough...`);
        await new Promise((resolve) => setTimeout(resolve, 7000));
        pizzaContext.pizzaOutput.status = PizzaStatus.READY_FOR_TOPPING;
        pizzaContext.pizzaOutput.timeStart = Date.now();
        console.timeEnd(`Order ${pizzaContext.orderId} preparing dough...`);
        return pizzaContext;
      }
    }
    return [task];
  }
}

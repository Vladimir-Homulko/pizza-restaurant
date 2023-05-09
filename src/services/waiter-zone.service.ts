import {KitchenZoneService} from "./kitchen-zone.service";
import {PizzaContext, Task} from "../common/interfaces/interfaces";
import {PizzaStatus} from "../common/enums/pizza-status.enum";
import {AdministratorService} from "./administrator.service";

export class WaiterZoneService extends KitchenZoneService {

  constructor(administratorService: AdministratorService) {
    super({ countThreads: 2, countSubTasks: 1 }, null, administratorService);
  }

  createTasks(pizzaContext: PizzaContext): Task<PizzaContext>[] {
    const task: Task<PizzaContext> = {
      execute: async () => {
        console.time("Serving pizza...");
        await new Promise((resolve) => setTimeout(resolve, 5000));
        pizzaContext.pizzaOutput.status = PizzaStatus.ON_TABLE;
        pizzaContext.pizzaOutput.timeEnd = Date.now();
        console.timeEnd("Serving pizza...");

        return pizzaContext
      }
    }

    return [task];
  }
}

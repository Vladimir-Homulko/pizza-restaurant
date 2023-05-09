import {KitchenZoneService} from "./kitchen-zone.service";
import {PizzaContext, Task} from "../common/interfaces/interfaces";
import {PizzaStatus} from "../common/enums/pizza-status.enum";
import {AdministratorService} from "./administrator.service";

export class OvenZoneService extends KitchenZoneService {

  constructor(nextZone: KitchenZoneService, administratorService: AdministratorService) {
    super(1, 1, nextZone, administratorService);
  }

  createTasks(pizzaContext: PizzaContext): Task<PizzaContext>[] {
    const task: Task<PizzaContext> = {
      execute: async () => {
        console.time("Brake pizza...");
        await new Promise((resolve) => setTimeout(resolve, 10000));
        pizzaContext.pizzaOutput.status = PizzaStatus.READY_FOR_SERVING;
        console.timeEnd("Brake pizza...");

        return pizzaContext;
      }
    }
    return [task];
  }
}

import {KitchenZoneService} from "./kitchen-zone.service";
import {PizzaContext, Task} from "../common/interfaces/interfaces";
import {PizzaStatus} from "../common/enums/pizza-status.enum";
import {AdministratorService} from "./administrator.service";

export class ToppingZoneService extends KitchenZoneService {

  constructor(nextZone: KitchenZoneService, administratorService: AdministratorService) {
    super(3, 2, nextZone, administratorService);
  }

  createTasks(pizzaContext: PizzaContext): Task<PizzaContext>[] {
    const tasks: Task<PizzaContext>[] = [];
    for (let i = 0; i < pizzaContext.pizzaInput.toppings.length; i++) {
      const topping = pizzaContext.pizzaInput.toppings[i];

      const task: Task<PizzaContext> = {
        execute: async () => {
          console.time(`Order ${pizzaContext.orderId} add ${i + 1} ${topping.name} topping...`);
          await new Promise((resolve) => setTimeout(resolve, 4000));
          pizzaContext.pizzaOutput.status = PizzaStatus.READY_FOR_OVEN;
          console.timeEnd(`Order ${pizzaContext.orderId} add ${i + 1} ${topping.name} topping...`);
          return pizzaContext;
        }
      }
      tasks.push(task);
    }

    return tasks;
  }
}

import {PizzaContext, Task} from "../common/interfaces/interfaces";
import {ExecutorService} from "./executor.service";
import {AdministratorService} from "./administrator.service";

export abstract class KitchenZoneService {
  private readonly nextZone: KitchenZoneService | null;
  private  readonly countSubTasks: number;
  private executorService: ExecutorService<PizzaContext>;
  private administratorService: AdministratorService;

  protected constructor(
    countThreads: number,
    countSubTasks: number,
    nextZone: KitchenZoneService | null,
    administratorService: AdministratorService
  ) {
    this.nextZone = nextZone;
    this.countSubTasks = countSubTasks;
    this.executorService = new ExecutorService(countThreads);
    this.administratorService = administratorService;
  }

  public async enqueue(pizzaContext: PizzaContext, tasks: Task<PizzaContext>[]) {
    const results = await this.executorService.executeAll(tasks, this.countSubTasks);
    const newContext = results[results.length - 1];

    if (this.nextZone) {
      await this.nextZone.enqueue(newContext, this.nextZone.createTasks(newContext));
    } else {
      this.administratorService.finishOrder({
        orderId: newContext.orderId,
        timeStart: newContext.pizzaOutput.timeStart,
        timeEnd: newContext.pizzaOutput.timeEnd,
      });
    }

    await this.executorService.shutdown();
  }

  public abstract createTasks(pizzaContext: PizzaContext): Task<PizzaContext>[];
}


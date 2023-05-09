import {Task} from "../common/interfaces/interfaces";

export class ExecutorService<T> {
  private pool: Promise<T>[] = [];

  constructor(private readonly maxThreads: number) {}

  async executeAll(tasks: Task<T>[], maxSubTasks: number = 1): Promise<T[]> {
    const results: T[] = [];
    let nextTaskIndex = 0;

    while (nextTaskIndex < tasks.length) {
      if (this.pool.length < this.maxThreads) {
        const task = tasks[nextTaskIndex++];
        const promise = task.execute();
        this.pool.push(promise);

        promise.then((result) => {
          results.push(result);
          this.pool.splice(this.pool.indexOf(promise), 1);
        }).catch((error) => {
          console.error(`Task error: ${error.message}`);
          this.pool.splice(this.pool.indexOf(promise), 1);
        });
      } else {
        await Promise.race(this.pool);
      }
    }

    await Promise.all(this.pool);

    return results;
  }

  async shutdown(): Promise<void> {
    await Promise.all(this.pool.map((promise) => {
      return promise.catch(() => {});
    }));
    this.pool = [];
  }
}

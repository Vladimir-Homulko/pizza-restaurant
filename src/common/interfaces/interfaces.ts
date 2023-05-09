import {PizzaStatus} from "../enums/pizza-status.enum";

export interface Order {
  toppings: Topping[];
}

export interface Topping {
  name: string;
}

export interface PizzaInput {
  toppings: Topping[];
}

export interface PizzaOutput {
  toppings: Topping[];
  status: PizzaStatus;
  timeStart: number;
  timeEnd: number;
}

export interface PizzaContext {
  orderId: number;
  pizzaInput: PizzaInput;
  pizzaOutput: PizzaOutput;
}

export interface Task<T> {
  execute: () => Promise<T>;
}

export interface OrderReport {
  orderId: number;
  timeStart: number;
  timeEnd: number;
}

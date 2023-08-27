import { makeAutoObservable, runInAction } from "mobx";
import { Order } from "./../models/Order";
import agent from "../store/context/api/agent";

export class OrderStore {
  order: Order[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  updatePayment = (orderId: number) => {
    try {
      runInAction(() => {
        agent.Orders.UpdatePayment(orderId);
      });
    } catch (e: any) {
      console.log("error", e.message);
    }
  };
}

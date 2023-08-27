import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { config } from "../Base";
import { Order } from "../models/Order";
import AsyncStorage from "@react-native-async-storage/async-storage";
import agent from "../store/context/api/agent";
import { Alert } from "react-native";

export class UserOrderStore {
  orders: Order[] = [];
  hubConnection: HubConnection | null = null;
  hubAdmin: HubConnection | null = null;

  badgeOrder: boolean = false;
  badgeCancel: boolean = false;
  badgePaynow: boolean = false;
  reload: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
 
  updatePayment = (orderId: number) => {
    try {
      runInAction(() => {
        agent.Orders.UpdatePayment(orderId).then((res) => {
          var currentOrder = this.orders.find((a) => a.id === res.Id);
          this.setOrder(currentOrder);

          // navigation.navigate("myOrder");
        });
        this.hubAdmin?.invoke("SendOrder", orderId);
        this.reload = !this.reload;
      });
    } catch (e) {}
  };

  confirmOrder = (orderId: number) => {
    agent.Orders.confirmOrder(orderId);
    this.reload = !this.reload;
  };

  readedaApprove = (userId: number) => {
    this.removeNotifications("Approve", userId);
    this.badgeOrder = false;
  };

  readedCancel = (userId: number) => {
    this.removeNotifications("Cancel", userId);
    this.badgeCancel = false;
  };

  loadNotifications = (values: boolean) => {
    this.badgeOrder = values;
  };

  saveNotifications = async (type: any, value: any, uid: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`@Notifications${type}-${uid}`, jsonValue);
    } catch (e) {
      console.log("error storing", e);
    }
  };

  removeNotifications = async (type: any, uid: any) => {
    try {
      await AsyncStorage.removeItem(`@Notifications${type}-${uid}`);
    } catch (e) {
      console.log("error storing", e);
    }
  };

  createConnection = async (userId: number) => {
    this.hubAdmin = new HubConnectionBuilder()
      .withUrl(config.HUB_ADMIN_ORDER)
      .withAutomaticReconnect()
      .build();

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(config.HUB_USER_ORDER + `?userId=${userId}`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .catch((err) => console.log("Error creating: ", err));
    this.hubAdmin.start().catch((err) => console.log("Error creating: ", err));

    this.hubConnection.on("loadOrders", (data) => {
      runInAction(() => {
        this.orders = data;
      });
    });

    this.hubConnection.on("ReceiveStatusOrder", (order) => {
      runInAction(() => {
        console.log("Received status order", order);
        if (order.orderStatus === 1) {
          this.badgeOrder = true;
          this.saveNotifications("Approve", true, userId);
        } else {
          this.badgeCancel = true;
          this.saveNotifications("Cancel", true, userId);
        }
        this.setOrder(order);
      });
    });
  };

  confirmStatusOrder = async (orderId: number) => {
    try {
      await agent.Orders.confirmOrder(orderId);
      runInAction(() => {
        this.hubAdmin?.invoke("SendOrder", orderId);
        var currentOrder = this.orders.find((a) => a.id === orderId);
        currentOrder!.statusConfirm = 1;
        this.setOrder(currentOrder);
      });
    } catch (error) {
      Alert.alert("error", "confirm orderStatus error", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  private setOrder = (data: any) =>
    (this.orders = [...this.orders.filter((x) => x.id !== data.id), data]);
}

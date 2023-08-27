import { makeAutoObservable, runInAction } from "mobx";
import agent from "../store/context/api/agent";
import { Review } from "../models/Review";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { config } from "../Base";

export class ReviewStore {
  Reviews: Review[] = [];
  hubConnection: HubConnection | null = null;
  reloadR: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  getMyReviews = (userId: any) => {
    agent.Reviews.getReviews(userId).then((res) => { 
      this.Reviews = res;
    });
  };
 
  createConnection = async (productId: number) => {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(config.HUB_Review + `?productId=${productId}`)
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .catch((err) => console.log("Error creating: ", err));

    this.hubConnection.on("loadReviews", (data) => {
      runInAction(() => {
        this.Reviews = data;
      });
    });

    this.hubConnection.on("ReceiveReview", (review) => {
      runInAction(() => {
        console.log("Received status review", review);
        this.setReviews(review);
        this.reloadR = !this.reloadR;
      });
    });
  };

  createReview = (reviewId: any) => {
    try {
      runInAction(() => {
        this.hubConnection?.invoke("SendReview", reviewId);
      });
    } catch (e) {
      console.log("error :", e);
    }
  };

  private setReviews = (data: any) =>
    (this.Reviews = [...this.Reviews.filter((x) => x.id !== data.id), data]);
}

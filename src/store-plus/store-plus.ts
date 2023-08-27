import { createContext, useContext } from "react";
import { UserOrderStore } from "./UserOrderStore";
import { OrderStore } from "./OrderStore";
import { ReviewStore } from "./ReviewStore";

interface Store {
  userOrderStore: UserOrderStore;
  orderStore: OrderStore;
  reviewStore: ReviewStore;
}

export const store: Store = {
  userOrderStore: new UserOrderStore(),
  orderStore: new OrderStore(),
  reviewStore: new ReviewStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};

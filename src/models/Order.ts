import { Address } from "./Address";
import { Coupon } from "./Coupon";

export interface Order {
    id: number;
    paymentImage: string;
    orderDate:Date;
    orderStatus:number;
    statusConfirm: number;
    totalPrice:number;
    couponId:number;
    coupon:Coupon;
    addressId:number;
    address:Address;
}
import { User } from "./User";

export interface Address {
    id: number;
    province:string;
    district:string;
    subDistrict:string;
    postCode:string;
    houseNumber:number;
    statusUse:number;
    userId:number;
    user:User;
}
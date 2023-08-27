export interface ShopCart {
    id:number;
    createDate:Date;
    userId: number;
    items:ShopCartItem[]
}

export interface ShopCartItem {
    id:number;
    quantity:number;
    productId:number;
    ShopCartId:number;
}
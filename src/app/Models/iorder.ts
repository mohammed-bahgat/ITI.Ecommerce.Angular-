import { IProductOffer } from "./iproduct-offer";

export interface IOrder {
    id: number,
    customerId: string,
    paymentId: number,
    orderDate: Date,
    
    status:string,
    productList:IProductOffer[]
}

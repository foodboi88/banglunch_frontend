import { IFood } from "./food.interface"

export interface IOrderDetail {
  _id: string
  orderId: string
  foodId: string
  quantity: number
  price: number
  __v: number
  foods: IFood
}

export interface IOrders {
  _id: string
  userId: string
  sellerId: string
  createdAt: string
  purchasedAt: any
  __v: number
  orderStatus: number
  orderDetail: IOrderDetail[]
}

export interface IUpdateFoodInCart {
  foodId: string,
  sellerId: string,
  quantity: number,
}
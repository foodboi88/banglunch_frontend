import { IComment } from "./comment.interface"
import { IFood } from "./food.interface"
import { IUser } from "./user.interface"

export interface IOrderDetail {
  _id: string
  orderId: string
  foodId: string
  quantity: number
  price: number
  __v: number
  foods: IFood,
  comments: IComment[]
}

export interface IOrders {
  _id: string
  userId: string
  sellerId: string
  createdAt: string
  purchasedAt: any
  __v: number
  orderStatus: number
  order_details: IOrderDetail[],
  deliveryCost: number,
  expectedDeliveryTime: string,
  seller?: IUser,
  user?: IUser
}

export interface ICreateOrder {
  deliveryCost: number,
  expectedDeliveryTime: Date
}

export interface IUpdateFoodInCart {
  foodId: string,
  sellerId: string,
  quantity: number,
}

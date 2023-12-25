export interface IComment {
  _id: string,
  userId: string,
  foodId: string,
  rate: number,
  description: string,
  createdAt: Date,
  orderDetailId: string
}
import { IGallery } from "./gallery.interface"

export interface IFood {
  _id: string
  content: string
  price: number
  views: number
  deletedAt: string
  updateAt: any
  title: string
  createdAt: string
  constantId: string
  sellerId: string
  height: string
  length: string
  weight: string
  width: string
  galleries: IGallery[],
  food_categories: IFoodCategory[]

}

export interface IFoodCategory {
  _id: string
  foodId: string
  categoryId: string
  __v: number
}

export interface ICreateFood {
  title: string
  content: string
  price: number
  weight: number
  length: number
  width: number
  height: number
  category: string,
}
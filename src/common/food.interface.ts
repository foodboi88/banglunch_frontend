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
    galleries: IGallery[]
  }
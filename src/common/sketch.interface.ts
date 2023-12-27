import { IGallery } from "./gallery.interface";
import { IOrderDetail } from "./order.interface";
import { IArchitecture } from "./tool.interface";
import { IUser } from "./user.interface";

export interface IReqGetLatestSketchs {
    size: number;
    offset: number;
}
export interface IReqProductsFiles {
    sketchId: string;
}
export interface ISketch {
    _id: string
    title: string;
    price: number;
    views: number;
    category: string;
    image: string;
}

export interface IFilteredSketch {
    _id: string;
    title: string;
    price: number;
    views: number;
    category: string;
    image: string;
}

export interface IShopDetail {
    foods: IFoodOfShop[],
    info: IUser
}

export interface IFoodOfShop {
    _id: string;
    title: string;
    price: number;
    views: number;
    category: string;
    galleries: IGallery[]
}

export interface ICurrentSearchValue {
    name?: string;
    categoryId?: string;
}
export interface ISize {
    width: string;
    height: string;
    area: string;
}
export interface IInFoSketch {
    title: string;
    content: string;
    price: number;
    views: number;
    likes: number;
    quantityPurchased: number;
    userId: string;
    collectionId: string;
    createdAt: Date;
    updatedAt: Date;
    id: string;
    fileSize?: number;
    size?: ISize;
    newPrice?: string;
    oldPrice?: string;
}
export interface IImagesSketch {
    filePath: string;
    id: string;
    isMain: boolean;
}
export interface IDetailSketch {
    images: IImagesSketch[];
    info: IInFoSketch;
    typeOfArchitectures: IArchitecture[];
    star: number | null;
}
export interface ISketchInCart {
    _id: string
    orderId: string
    foodId: string
    quantity: number
    price: number
    __v: number
    foods: IDetailFood
}

export interface IGetSketchRequest {
    size: number;
    offset: number;
    search?: string;
    startTime?: string;
    endTime?: string;
    status?: string
    sortBy?: string
    sortOrder?: string
}

export interface IStatisticSketch {
    totalProduct: number;
    totalProductNew: number;
}

export interface ISellerStatisticSketch {
    totalProduct: number;
    totalHiddenProduct: number;
}

export interface IUploadSketchRequest {
    title: string,
    price: number,
    content: string,
    id: string,
    category: string[]
};

export interface IDetailFood {
    _id: string
    content: string
    price: number
    views: number
    deletedAt: string
    updatedAt: any
    title: string
    createdAt: string
    sellerId: string
    height: number
    length: number
    weight: number
    width: number
    seller: IUser
    galleries: IGallery[]
    food_categories: IFoodCategory[],
    order_details: IOrderDetail
    summarizedComments: string,
}

export interface IInfor {
    _id: string
    shopStatus: boolean
    userId: string
    fromDetailAddress: string
    identityId: string
    personalTaxCode: string
    __v: number
}
export interface IFoodCategory {
    _id: string
    foodId: string
    categoryId: string
    categories: ICategories
}

export interface ICategories {
    _id: string
    name: string
    description: string
}

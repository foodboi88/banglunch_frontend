import { RcFile } from "antd/lib/upload";
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

export interface IGallery {
    _id: string
    fileName: string
    filePath: string
    isMain: boolean
    foodId: string
}

export interface ICurrentSearchValue {
    name?: string;
    tool?: string;
    architecture?: string;
    style?: string;
    size?: number;
    offset?: number;
    authorId?: string;
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
    title: string;
    price: number;
    collectionId: string;
    createdAt: Date;
    updatedAt: Date;
    id: string;
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
    title?: string,
    imageUploadLst?: RcFile,
    fileUploadLst?: RcFile,
    size?: string,
    price?: string,
    content?: string,
    productDesignStyles?: string, // Set default value
    productDesignTools?: string,
    productTypeOfArchitecture?: string,
    note?: string
    id?: string
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
    height: string
    length: string
    weight: string
    width: string
    seller: IUser
    galleries: any[]
    food_categories: IFoodCategory[]
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

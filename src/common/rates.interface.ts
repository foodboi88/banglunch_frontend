export interface IRateList {
    averageRate?: number,
    items: IRate[],
    numberOfItems?: number;
}
export interface IRate {
    userId: string
    username: string,
    foodId: string,
    description: string,
    rate: number,
    createdAt: string,
    id: string,
}



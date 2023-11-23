export interface IOverViewStatictis {
    totalRevenue: number;
    totalOrder: number;
    totalSeller: number;
    totalUser: number;
}

export interface IOverViewStatictisDay {
    total: number;
    statictisDay: IStatictisDay[];
    totalPriceSum: number;
    totalPriceSellerSum: number;
    totalPriceOwnSum: number;
    totalPriceIncomeSum: number;
}

export interface IOverViewStatictisMonth {
    total: number;
    statictisMonth: IStatictisMonth[];
    totalPriceSum: number;
    totalPriceSellerSum: number;
    totalPriceOwnSum: number;
    totalPriceIncomeSum: number;
}
export interface IOverViewStatictisQuarter {
    total: number;
    statictisQuarter: IStatictisQuarter[];
    totalPriceSum: number;
    totalPriceSellerSum: number;
    totalPriceOwnSum: number;
    totalPriceIncomeSum: number;
}
export interface IOverViewStatictisYear {
    total: number;
    statictisYear: IStatictisYear[];
    totalPriceSum: number;
    totalPriceSellerSum: number;
    totalPriceOwnSum: number;
    totalPriceIncomeSum: number;
}
export interface IStatictisDay {
    id: string,
    totalPrice: number,
    totalPriceSeller: number,
    totalPriceOwn: number,
    totalPriceIncome: number,
    day: string,
    createdAt: string,
    updatedAt: string
}

export interface IStatictisMonth {
    id: string,
    totalPrice: number,
    totalPriceSeller: number,
    totalPriceOwn: number,
    totalPriceIncome: number,
    month: string,
    year: string,
    createdAt: string,
    updatedAt: string
}

export interface IStatictisQuarter {
    id: string,
    totalPrice: number,
    totalPriceSeller: number,
    totalPriceOwn: number,
    totalPriceIncome: number,
    quarter: string,
    year: string,
    createdAt: string,
    updatedAt: string
}

export interface IStatictisYear {
    id: string,
    totalPrice: number,
    totalPriceSeller: number,
    totalPriceOwn: number,
    totalPriceIncome: number,
    year: string,
    createdAt: string,
    updatedAt: string
}

export interface IStatictisUserDay {
    items: IStatictisUserDayItem[],
    total: number,
}
export interface IStatictisSellerDay {
    items: IStatictisSellerDayItem[],
    total: number,
}
export interface IStatictisUserDayItem {
    totalUser: number,
    day: string,
    createdAt: string,
    updatedAt: string,
    id: string
}
export interface IStatictisSellerDayItem {
    totalSeller: number,
    day: string,
    createdAt: string,
    updatedAt: string,
    id: string
}

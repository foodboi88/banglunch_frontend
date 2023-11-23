export interface IBusiness {
    id: string;
    name: string;
    address: string;
}

export interface IReqFormArchitect {
    sellerType: string,
    identityCardNumber: string,
    identityCardDate: string,
    identityCardPlace: string,
    vatCode: string,
    bankAccountNumber: string,
    bankAccountName: string,
    bankName: string,
    bankBranch: string,
    additionalProp1: {}
}

export interface IBank {
    id: number,
    name: string,
    code: string,
    bin: string,
    shortName: string,
    logo: string,
    transferSupported: number,
    lookupSupported: number,
    short_name: string,
    support: number,
    isTransfer: number,
    swift_code: string

}

export interface IReqLookUp {
    bin: string,
    accountNumber: string
}
export interface IReqGetAllTools {
    size: number;
    offset: number;
}

export interface ITool {
    name: string;
    description: string;
    id: string;
    imageUrl?: string;
}

export interface IArchitecture {
    name: string;
    description: string;
    id: string;
}

export interface IStyle {
    name: string;
    description: string;
    id: string;
}

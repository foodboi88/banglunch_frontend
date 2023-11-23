
export default class GLobalDM {
    static mapSvg = new Map<string, string>();
    static defaultBytes32 = '00000000-0000-0000-0000-000000000000';
    static dateDeflaut = new Date("2000-01-01")
}

export class MainStyle{
    static mainColor = '#6265FF'
}
export interface MenuInfo {
    key: string;
    keyPath: string[];
    /** @deprecated This will not support in future. You should avoid to use this */
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}
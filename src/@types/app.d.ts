declare type PropsAny = { [key: string]: unknown };
declare interface Props extends PropsAny {
    children?: React.ReactNode | React.ReactNodeArray;
    key?: string | number | null | undefined;
    className?: string | undefined;
    style?: React.CSSProperties;
    disabled?: boolean;
    onClick?: (event: unknown) => void;
    onContextMenu?: (event: React.MouseEvent<Element, MouseEvent>) => void
}
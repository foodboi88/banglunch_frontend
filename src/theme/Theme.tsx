/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
// import { createUseStyles, ThemeProvider, useTheme } from "react-jss";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const themeDefine = require('./theme-define');
const { palette: Palette } = themeDefine;
enum ZIndex {
    default = 1000,
    loading = 1300,
    panel = 50
}

export interface ThemePalette {
    primary: string;
    default: string;
    background: string;
    light: string;
    backgroundGray: string;
    text: string;
    disabled: string;
    border: string;
    gray: string;
    error: string;
    warning: string;
    origin: string;
}

export interface ThemeDefine {
    palette: ThemePalette;
    shadows: { [key: number]: string };
    shape: {
        borderRadius: string
    };
    zIndex: {
        dialog: ZIndex,
        loading: ZIndex,
        panel: ZIndex
    };
    height: {
        fullScreen: string,
        navbar: string,
        paddingYPage: string
    }
}

export const themeValue: ThemeDefine = {
    palette: {
        primary: Palette.primary,
        default: '#000',
        background: '#fff',
        light: '#fff',
        backgroundGray: Palette['bg-gray'],
        text: 'rgba(0, 0, 0, 0.87)',
        disabled: 'rgba(0, 0, 0, 0.26)',
        border: '#EBECF1',
        gray: '#AAB2BF',
        error: '#CF1322',
        warning: '#FFCB1C',
        origin: ''
    },
    shadows: {
        0: "none",
        1: "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
        2: "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
        3: "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
        4: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
        5: "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
        6: "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
        7: "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
        8: "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
        9: "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
        10: "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)"
    },
    shape: {
        borderRadius: '4px',
    },
    zIndex: {
        dialog: ZIndex.default,
        loading: ZIndex.loading,
        panel: ZIndex.panel
    },
    height: {
        fullScreen: "100vh",
        navbar: "64px",
        paddingYPage: "60px"
    }
}

// export function createStyles<T extends string>(fn: (data: ThemeDefine) => Record<T, any>) {
//     return createUseStyles(fn);
// }
// export function useStyleTheme<T extends string, K extends string>(
//     useStyles: (data?: any) => Record<T, string>,
//     props?: Record<K, unknown>
// ): Record<T, string> {
//     const theme = useTheme<ThemeDefine>();
//     return useStyles({ ...props, theme });
// }
// export function CThemeProvider({ children }: Props): JSX.Element {
//     return (
//         <ThemeProvider theme={themeValue}>
//             {children}
//         </ThemeProvider>
//     )
// }
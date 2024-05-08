import { PaletteColorOptions, Theme, ThemeOptions, createTheme } from "@mui/material/styles";
import { red, green, blue, purple, grey } from '@mui/material/colors';
import { Palette } from "@mui/icons-material";
import { light } from "@mui/material/styles/createPalette";

// declare module '@mui/material/styles' {
//     interface Theme {
//         colors: {
//             formContainerBackground: string
//         }
//     }
//     // allow configuration using `createTheme`
//     interface ThemeOptions {
//         colors?: {
//             formContainerBackground?: string;
//         };
//     }
// }

// export const theme = () => {
//     return (
//         createTheme())
// };

export const theme = createTheme(
    {
        palette: {
            secondary: {
                main: '#B6B8C5'
            }

        }
    }
)

// export const theme = (prefersDarkMode: Boolean) => {

//     return (
//         createTheme(
//             (!prefersDarkMode ?
//                 {
//                     palette: {
//                         mode: 'light',
//                         myAwesomeColor: palette.augmentColor({ color: purple }),
//                         primary: {
//                             main: blue[500],
//                         },
//                         secondary: {
//                             main: green[500]
//                         }
//                     },
//                 } : {

//                     palette: {
//                         mode: 'dark',
//                         primary: {
//                             main: green[500],
//                         },
//                         secondary: {
//                             main: blue[500]
//                         }
//                     },
//                 }
//             )
//         )
//     )
// }

// const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

// export const muiTheme = createTheme({

//     palette:
//         (!prefersDarkMode ? {
//             boxcolor: '#FFFFFF'
//         } : {
//             boxcolor: 'black'
//         })

//     ,
// });
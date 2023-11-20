import { createTheme } from "@mui/material"
import "@fontsource/montserrat";
import { csCZ } from '@mui/x-data-grid';

export const theme = createTheme(
    {
    palette: {
        info: {
            main: "#848484"
        },
        primary: {
            main: '#558B2F',
            light: '#9CCC65',
            dark: '33691E',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#424242',
            light: '#BDBDBD',
            dark: '#212121'
        },
    },



    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#558B2F',
                    color: '#FFFFFF',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 100,
                },
            },
        },

    },

    typography: {
        fontFamily: 'Montserrat',
        h1: {
            fontSize: '6rem', // 96px
            '@media (max-width:960px)': {
                fontSize: '4rem', // 64px
            },
            '@media (max-width:600px)': {
                fontSize: '3rem', // 48px
            },
        },
        h2: {
            fontSize: '3.75rem', // 60px
            '@media (max-width:960px)': {
                fontSize: '3rem', // 48px
            },
            '@media (max-width:600px)': {
                fontSize: '2.5rem', // 40px
            },

        },
        h3: {
            fontSize: '3rem', // 48px
            '@media (max-width:960px)': {
                fontSize: '2.5rem', // 40px
            },
            '@media (max-width:600px)': {
                fontSize: '2rem', // 32px
            },
            fontWeight: 500,
            fontStyle: 'italic',
        },
        h4: {
            fontSize: '2.125rem', // 34px
            '@media (max-width:960px)': {
                fontSize: '1.5rem', // 24px
            },
            '@media (max-width:600px)': {
                fontSize: '1.25rem', // 20px
            },
        },
        h5: {
            fontSize: '1.5rem', // 24px
            '@media (max-width:960px)': {
                fontSize: '1.25rem', // 20px
            },
            '@media (max-width:600px)': {
                fontSize: '1.125rem', // 18px
            },
        },
        h6: {
            fontSize: '1.25rem', // 20px
            '@media (max-width:960px)': {
                fontSize: '1.125rem', // 18px
            },
            '@media (max-width:600px)': {
                fontSize: '1rem', // 16px
            },
        },
        subtitle1: {
            fontSize: '1rem', // 16px
            '@media (max-width:960px)': {
                fontSize: '0.875rem', // 14px
            },
            '@media (max-width:600px)': {
                fontSize: '0.75rem', // 12px
            },
        },
        subtitle2: {
            fontSize: '0.875rem', // 14px
            '@media (max-width:960px)': {
                fontSize: '0.75rem', // 12px
            },
            '@media (max-width:600px)': {
                fontSize: '0.625rem', // 10px
            },
        },
        body1: {
            fontSize: '1rem', // 16px
            '@media (max-width:960px)': {
                fontSize: '0.875rem', // 14px
            },
            '@media (max-width:600px)': {
                fontSize: '0.75rem', // 12px
            },
        },
        body2: {
            fontSize: '0.875rem', // 14px
            '@media (max-width:960px)': {
                fontSize: '0.75rem', //12px
            },
            '@media (max-width:600px)': {
                fontSize: '0.625rem', // 10px
            },
        },
        button: {
            fontSize: '1rem', // 16px
            '@media (max-width:960px)': {
                fontSize: '0.875rem', // 14px
            },
            '@media (max-width:600px)': {
                fontSize: '0.75rem', // 12px
            },
            fontWeight: 400,
            textTransform: "none"
        },
        caption: {
            fontSize: '0.75rem', // 12px
            '@media (max-width:960px)': {
                fontSize: '0.625rem', // 10px
            },
            '@media (max-width:600px)': {
                fontSize: '0.5rem', // 8px
            },
        },
        overline: {
            fontSize: '0.75rem', // 12px
            '@media (max-width:960px)': {
                fontSize: '0.625rem', // 10px
            },
            '@media (max-width:600px)': {
                fontSize: '0.5rem', // 8px
            },
        },
    },

},csCZ);

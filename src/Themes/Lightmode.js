import { createTheme } from "@material-ui/core"

const theme = createTheme({
    palette: {
        primary: {
            light: "#89CFF0",
            main: "#4682b4",
            dark: "#1b5583"
        },
        secondary: {
            light: "#fff5ee",
            main: "#faf0e6",
            dark: "#F2ebdd"
        }
    },
    typography: {
        fontFamily: "'Noto Sans JP', sans-serif"
    }
})

theme.typography.h3 = {
    fontSize: '2.5rem',
    '@media (min-width:600px)': {
        fontSize: '3rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '2rem',
    },
}

export { theme as lightTheme };
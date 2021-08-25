import { createTheme } from "@material-ui/core"
import { lightBlue, amber } from "@material-ui/core/colors"

const theme = createTheme({
    palette: {
        primary: lightBlue,
        secondary: amber
    },
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
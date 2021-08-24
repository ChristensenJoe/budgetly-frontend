import {createTheme} from "@material-ui/core"
import {lightBlue, amber} from "@material-ui/core/colors"

const theme = createTheme({
    palette: {
        primary: lightBlue,
        secondary: amber
    }
})

export {theme as lightTheme};
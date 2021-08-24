import {
    makeStyles,
    useTheme,
    Typography,
    Card,
    CardContent
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '80vh',
        width: '60vh',
        backgroundColor: theme.palette.secondary.light
    }
}));

function UserCategories({userData}) {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Card
            className={classes.root}
            elevation={3}
        >
            <CardContent>
                <Typography
                    variant="h2"
                >
                    Categories: 
                </Typography>
            </CardContent>
        </Card>
    );
}

export default UserCategories;
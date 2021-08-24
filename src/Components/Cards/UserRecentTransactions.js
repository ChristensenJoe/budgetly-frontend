import {
    makeStyles,
    useTheme,
    Typography,
    Card,
    CardContent
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '30vh',
        width: '60vh',
        backgroundColor: theme.palette.secondary.light
    }
}));

function UserRecentTransactions({userData}) {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Card
            className={classes.root}
            elevation={3}
        >
            <CardContent>
                <Typography
                    variant="h3"
                >
                    Recent Transactions: 
                </Typography>
            </CardContent>
        </Card>
    );
}

export default UserRecentTransactions;
import {
    makeStyles,
    useTheme,
    Typography,
    Card,
    CardContent,
    Divider,
    Grid
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.light
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    title: {
        display: 'inline-block',
        verticalAlign: 'top',
        fontWeight: 'bold',
        wordBreak: 'break-all'
    },
    divider: {
        backgroundColor: theme.palette.secondary.dark,
        height: "2px",
        width: '90%',
    },
    balance: {
        fontSize: "40px",
    }
}));

function UserRecentTransactionsPreview({name, amount}) {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Grid
            item
            xs={12}
        >
            <Card
                className={classes.root}
                elevation={3}
            >
                <CardContent
                    className={classes.content}
                >
                    <Typography
                        className={classes.title}
                        variant="h3"
                    >
                        {name}
                    </Typography>
                    <Divider
                        className={classes.divider}
                    />
                </CardContent>
                <CardContent
                    className={classes.content}
                >
                    <Typography
                        className={classes.balance}
                        variant="h3"
                    >
                        {`$${amount}`}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default UserRecentTransactionsPreview
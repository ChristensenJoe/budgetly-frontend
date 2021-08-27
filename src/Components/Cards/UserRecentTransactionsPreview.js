import {
    makeStyles,
    useTheme,
    Typography,
    Card,
    CardContent,
    Divider,
    Grid,
    useMediaQuery
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.primary.light,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        textAlign: "left",
        [theme.breakpoints.down('xs')]: {
            textAlign: "center",
        },
        fontWeight: 'bold',
        wordWrap: 'break-word',
        marginTop: 'auto',
        marginBottom: 'auto',
        fontSize: "40px",
    },
    balance: {
        textAlign: "center",
        [theme.breakpoints.down('xs')]: {
            textAlign: "center",
        },
        fontSize: "40px",
        wordBreak: 'break-all',
    },
    divider: {
        backgroundColor: theme.palette.secondary.dark,
        width: '3px',
        float: 'right',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            height: '3px',
            float: 'center',
            marginRight: 'auto'
        },
        marginRight: 10
    }
}));

function UserRecentTransactionsPreview({ name, amount, gain }) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const breakArea = useMediaQuery(theme.breakpoints.down('xs'));
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
                    <Grid
                        container
                    >
                        <Grid
                            item
                            xs={12}
                            sm={5}
                        >
                            <Typography
                                className={classes.title}
                                variant="h3"
                            >
                                {name}
                            </Typography>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sm={1}
                        >
                            <Divider
                                orientation={breakArea ? "horizontal" : "vertical"}
                                className={classes.divider}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                        >
                            <Typography
                                className={classes.balance}
                                variant="h3"
                            >
                                {`${gain ? "+" : "-"}$${amount}`}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default UserRecentTransactionsPreview
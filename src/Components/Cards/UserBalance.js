import {
    makeStyles,
    useTheme,
    Typography,
    Card,
    CardContent,
    Divider
} from "@material-ui/core"

const useStyles = makeStyles(theme => ({
    root: {
        height: '35vh',
        width: '60vh',
        backgroundColor: theme.palette.secondary.light
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
    },
    divider: {
        backgroundColor: theme.palette.primary.dark,
        height: "2px",
        width: '90%',

    },
    balance: {
        fontSize: "80px",

    }
}));

function UserBalance({ userData }) {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (
        <Card
            className={classes.root}
            elevation={3}
        >
            <CardContent
                className={classes.content}
            >
                <Typography
                    className={classes.title}
                    variant="h2"
                >
                    Balance
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
                >
                    ${userData.balance}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default UserBalance;
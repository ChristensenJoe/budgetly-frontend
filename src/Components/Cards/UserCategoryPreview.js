import {
    makeStyles,
    useTheme,
    Typography,
    Card,
    CardContent,
    Divider,
    Grid
} from "@material-ui/core"

import {useHistory} from "react-router-dom"

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
        wordBreak: 'break-all',
        marginBottom: 5
    },
    divider: {
        backgroundColor: theme.palette.secondary.dark,
        height: "2px",
        width: '75%',

    },
    balance: {
        fontSize: "40px",
    }
}));

function UserCategoryPreview({name, balance, userData}) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const history = useHistory();

    function onClickCategory(e) {
        history.push(`/${userData.username}/${name}`);
    }

    return (
        <Grid
            item
            xs={12}
            lg={6}
            onClick={onClickCategory}
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
                        {balance}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default UserCategoryPreview;
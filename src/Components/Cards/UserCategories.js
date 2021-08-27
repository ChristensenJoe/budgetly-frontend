import {
    makeStyles,
    useTheme,
    Typography,
    Card,
    CardContent,
    Divider,
    Grid
} from "@material-ui/core"
import {useState, useEffect} from 'react'
import UserCategoryPreview from "./UserCategoryPreview";

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '80vh',
        maxHeight: '120vh',
        width: '60vh',
        backgroundColor: theme.palette.primary.main,
        overflow: 'scroll'
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
        marginBottom: 10
    },
    divider: {
        backgroundColor: theme.palette.secondary.dark,
        height: "3px",
        width: '80%',

    },
    balance: {
        fontSize: "80px",
    }
}));

function UserCategories({ userData }) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        let isMounted = true;
        fetch(`http://localhost:9292/categories?user_id=${userData.id}`)
        .then(res => res.json())
        .then(data => {
            if(isMounted) {
                setCategories(data)
            }
        });

        return () => {isMounted = false}
    }, [userData.id])


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
                    Categories
                </Typography>
                <Divider
                    className={classes.divider}
                />
            </CardContent>
            <CardContent
                className={classes.content}
            >
                <Grid
                    container
                    spacing={2}
                >
                    {categories.map(category => {
                        return (
                            <UserCategoryPreview 
                                key={category.id}
                                name={category.name}
                                balance={category.balance}
                                userData={userData}
                            />
                        );
                    })}
                </Grid>
            </CardContent>
        </Card>
    );
}

export default UserCategories;
import {
    makeStyles,
    useTheme,
    Container,
    Card,
    CardContent,
    Typography,
    Divider

} from '@material-ui/core'

import { useHistory } from 'react-router-dom'

import NewCategoryForm from '../Components/Forms/NewCategoryForm'



const useStyles = makeStyles(theme => ({
    root: {
        margin: 20,
        width: "80%",
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    card: {
        minHeight: '50vh',
        width: '100%',
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
    },
    divider: {
        backgroundColor: theme.palette.secondary.dark,
        height: "3px",
        width: '100%',

    },
    list: {

    }
}))

function CreateCategory({ userData, setCategories }) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const history = useHistory();

    if (!userData) {
        history.push('/login')
    }

    return (
        <Container
            className={classes.root}
        >
            <Card
                className={classes.card}
                elevation={3}
            >
                <CardContent
                    className={classes.content}
                >
                    <Typography
                        className={classes.title}
                        variant="h2"
                    >
                        New Category
                    </Typography>
                    <Divider
                        className={classes.divider}
                    />
                </CardContent>

                <CardContent>
                    <NewCategoryForm
                        userData={userData}
                        setCategories={setCategories}
                    />
                </CardContent>
            </Card>
        </Container>
    );
}

export default CreateCategory;
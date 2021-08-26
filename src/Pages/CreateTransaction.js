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

import NewTransactionForm from '../Components/Forms/NewTransactionForm'



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
        textAlign: 'center',
    },
    divider: {
        backgroundColor: theme.palette.primary.dark,
        height: "2px",
        width: '100%',

    },
    list: {

    }
}))

function CreateTransaction({ userData, setUser }) {
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
                        New Transaction
                    </Typography>
                    <Divider
                        className={classes.divider}
                    />
                </CardContent>

                <CardContent>
                    <NewTransactionForm
                        userData={userData}
                        setUser={setUser}
                    />
                </CardContent>
            </Card>
        </Container>
    );
}

export default CreateTransaction;
import {
    makeStyles,
    useTheme,
    Typography,
    Card,
    CardContent,
    Divider,
    Grid
} from "@material-ui/core"
import { useState, useEffect } from "react"
import UserRecentTransactionsPreview from "./UserRecentTransactionsPreview";

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '30vh',
        width: '60vh',
        backgroundColor: theme.palette.secondary.light,
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

function UserRecentTransactions({ userData }) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        let isMounted = true;
        fetch(`http://localhost:9292/transactions?user_id=${userData.id}&limit=10`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setTransactions(data)
                }
            });

        return () => { isMounted = false }
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
                    Recent Transactions
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
                    {transactions.map(transaction => {
                        return (
                            <UserRecentTransactionsPreview
                                key={transaction.id}
                                name={transaction.name}
                                amount={transaction.amount}
                                userData={userData}
                            />
                        )
                    })}
                </Grid>
            </CardContent>
        </Card>
    );
}

export default UserRecentTransactions;
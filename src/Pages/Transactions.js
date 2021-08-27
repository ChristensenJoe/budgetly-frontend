import {
    makeStyles,
    useTheme,
    Container,
    Card,
    CardContent,
    Typography,
    Divider,
    Table,
    TableHead,
    TableBody,
    TableContainer,
    TableRow,
    TableCell,
    Paper,

} from '@material-ui/core'

import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'


import TransactionsTableItem from '../Components/Tables/TransactionTableItem'

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
    },
    divider: {
        backgroundColor: theme.palette.primary.dark,
        height: "2px",
        width: '100%',

    },
    list: {

    }
}))

function Transactions({ userData, setUser }) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const history = useHistory();
    const [transactions, setTransactions] = useState([]);

    if (!userData) {
        history.push('/login')
    }

    useEffect(() => {
        let isMounted = true
        fetch(`http://localhost:9292/transactions?user_id=${userData.id}`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setTransactions(data)
                }
            });

        return () => { isMounted = false }
    }, [userData.id])

    function handleDeleteTransaction(id, amount) {
        fetch(`http://localhost:9292/transactions/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                setTransactions(transactions => transactions.filter(transaction => transaction.id !== id))

                let newBalance = 0;
                if (data.gain) {
                    newBalance = Number.parseFloat(userData.balance) - Number.parseFloat(amount)
                }
                else {
                    newBalance = Number.parseFloat(userData.balance) + Number.parseFloat(amount)
                }
                setUser((userData) => {
                    return {
                        ...userData,
                        balance: newBalance
                }
                })
            })
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
                        All Transactions
                    </Typography>
                    <Divider
                        className={classes.divider}
                    />
                </CardContent>

                <CardContent>
                    <TableContainer
                        component={Paper}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        align="left"
                                    >
                                        Name
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                    >
                                        Amount
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                    >
                                        Date
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                    >

                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.map(transaction => {
                                    return (
                                        <TransactionsTableItem
                                            key={transaction.id}
                                            handleDeleteTransaction={handleDeleteTransaction}
                                            id={transaction.id}
                                            name={transaction.name}
                                            amount={transaction.amount}
                                            date={transaction.created_at}
                                            gain={transaction.gain}
                                        />
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Container>
    );
}

export default Transactions;
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
    Grid

} from '@material-ui/core'

import { useParams, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'

import CategoryTransactionsTableItem from '../Components/Tables/CategoryTransactionsTableItem'

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
        marginBottom: 10
    },
    divider: {
        backgroundColor: theme.palette.secondary.dark,
        height: "4px",
        width: '100%',
        marginBottom: -10,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    infoSubDivider: {
        backgroundColor: theme.palette.secondary.dark,
        height: "2px",
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20
    },
    information: {
        margin: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    tableContainer: {
        marginTop: 20
    },
    infoText: {
        marginBottom: 6
    }
}))

function Category({ userData, setUser }) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const params = useParams();
    const history = useHistory();
    const [category, setCategory] = useState([]);
    const [transactions, setTransactions] = useState([]);

    if (!userData) {
        history.push('/login')
    }

    useEffect(() => {
        let isMounted = true
        fetch(`http://localhost:9292/categories?user_id=${userData.id}&category_name=${params.category}`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setCategory(data);

                    fetch(`http://localhost:9292/transactions?category_id=${data.id}`)
                        .then(res => res.json())
                        .then(data => {
                            setTransactions(data);
                        })
                }
            })

        return () => { isMounted = false }
    }, [params.category, userData.id])

    function handleDeleteTransaction(id, amount) {
        fetch(`http://localhost:9292/transactions/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                setTransactions(transactions => transactions.filter(transaction => transaction.id !== id))

                let newUserBalance = 0;
                let newCategoryBalance = 0;
                if (data.gain) {
                    newUserBalance = Number.parseFloat(userData.balance) - Number.parseFloat(amount)
                    newCategoryBalance = Number.parseFloat(category.balance) - Number.parseFloat(amount)
                }
                else {
                    newUserBalance = Number.parseFloat(userData.balance) + Number.parseFloat(amount)
                    newCategoryBalance = Number.parseFloat(category.balance) + Number.parseFloat(amount)
                }
                setCategory((category) => {
                    return {
                        ...category,
                        balance: newCategoryBalance
                    }
                })
                setUser((userData) => {
                    return {
                        ...userData,
                        balance: newUserBalance
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
                        {category.name}
                    </Typography>
                    <Divider
                        className={classes.divider}
                    />
                </CardContent>

                <CardContent
                    className={classes.content}
                >
                    <Typography
                        className={classes.title}
                        variant="h3"
                    >
                        Information
                    </Typography>
                    <Grid
                        className={classes.information}
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            xs={6}
                        >
                            <Typography
                                variant="h4"
                                className={classes.infoText}
                            >
                                Balance
                            </Typography>
                            <Divider
                                className={classes.infoSubDivider}
                            />
                            <Typography
                                variant="h4"
                            >
                                {`$${category.balance}`}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}
                        >
                            <Typography
                                variant="h4"
                                className={classes.infoText}
                            >
                                Percentage
                            </Typography>
                            <Divider
                                className={classes.infoSubDivider}
                            />
                            <Typography
                                variant="h4"
                            >
                                {`${category.percentage*100}%`}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Divider
                        className={classes.divider}
                    />
                </CardContent>

                <CardContent
                    className={classes.content}
                >
                    <Typography
                        className={classes.title}
                        variant="h3"
                    >
                        Transactions
                    </Typography>
                    <TableContainer
                        className={classes.tableContainer}
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
                                        <CategoryTransactionsTableItem
                                            key={transaction.id}
                                            id={transaction.id}
                                            name={transaction.name}
                                            amount={transaction.amount}
                                            date={transaction.created_at}
                                            gain={transaction.gain}
                                            handleDeleteTransaction={handleDeleteTransaction}
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

export default Category;
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
    Paper

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

function Category({ userData }) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const params = useParams();
    const history = useHistory();
    const [category, setCategory] = useState([]);
    const [transactions, setTransactions] = useState([]);

    if (!userData) {
        history.push('/login')
        userData = []
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
    console.log("tra", transactions)
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.map(transaction => {
                                return (
                                    <CategoryTransactionsTableItem
                                        key={transaction.id}
                                        name={transaction.name}
                                        amount={transaction.amount}
                                        date={transaction.created_at}
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
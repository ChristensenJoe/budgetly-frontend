import {
    Grid,
    makeStyles,
    useTheme,
    TextField,
    Button,
    InputAdornment,
    OutlinedInput,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    FormGroup,
    FormControlLabel,
    Checkbox
} from '@material-ui/core'

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
        textAlign: 'center',
        marginTop: 30
    },
    input: {
        width: '300px'
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
    formGroup: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    }
}));

function NewTransactionForm({ userData, setUser }) {
    const history = useHistory();
    const theme = useTheme();
    const classes = useStyles(theme);
    const [isTransactionNameValid, setIsTransactionNameValid] = useState(true);
    const [isAmountValid, setIsAmountValid] = useState(true);
    const [isMainCategoryValid, setIsMainCategoryValid] = useState(true);
    const [transactionForm, setTransactionForm] = useState({
        name: "",
        amount: "",
        category_ids: [],
        main_category_id: ""
    })

    const [isOtherCategoriesVisisble, setIsOtherCategoriesVisisble] = useState(false)

    const [categories, setCategories] = useState([])
    const [filteredCategories, setFilteredCategories] = useState([])

    useEffect(() => {
        let isMounted = true;
        fetch(`http://localhost:9292/categories?user_id=${userData.id}`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setCategories(data)
                    setFilteredCategories(data)
                }
            });

        return () => { isMounted = false }
    }, [userData.id])

    function handleChange(event) {
        setTransactionForm(transactionForm => {
            return {
                ...transactionForm,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleMainCategoryChange(event) {
        setTransactionForm(transactionForm => {
            return {
                ...transactionForm,
                main_category_id: event.target.value
            }
        });
        setFilteredCategories(categories.filter(category => category.id !== event.target.value))
        setIsOtherCategoriesVisisble(true)
    }

    function handleOtherCategoriesChange(event) {
        const category_ids = transactionForm.category_ids
        let given_id = Number.parseInt(event.target.name, 10);
        if(category_ids.includes(given_id)) {
            setTransactionForm(transactionForm => {
                return {
                    ...transactionForm,
                    category_ids: category_ids.filter(category_id => category_id !== given_id)
                }
            });
        }
        else {
            setTransactionForm(transactionForm => {
                return {
                    ...transactionForm,
                    category_ids: [...category_ids, given_id]
                }
            });
        }
    }

    console.log(transactionForm)

    function onSubmitForm(event) {
        event.preventDefault();
        setIsAmountValid(true);
        setIsTransactionNameValid(true);
        setIsMainCategoryValid(true);

        if(transactionForm.name === "") {
            setIsTransactionNameValid(false)
        }
        if(transactionForm.amount === "") {
            setIsAmountValid(false)
        }

        if(transactionForm.main_category_id === "") {
            setIsMainCategoryValid(false)
        }

        if(isAmountValid && isTransactionNameValid && isMainCategoryValid) {
            const newTransaction = {
                name: transactionForm.name,
                amount: Number.parseFloat(transactionForm.amount),
                user_id: userData.id,
                main_category_id: transactionForm.main_category_id,
                category_ids: transactionForm.category_ids
            }
    
            fetch(`http://localhost:9292/transactions`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(newTransaction)
            })
            .then(res => res.json())
            .then(data => {
                setUser(user => {
                    return {
                        ...user,
                        balance: user.balance-data.amount
                    }
                })
                history.push(`/${userData.username}/transactions`)
            })
        }
        
    }

    return (
        <form
            noValidate
            autoComplete="off"
            onSubmit={onSubmitForm}
        >
            <Grid
                className={classes.root}
                container
                spacing={5}
            >
                <Grid
                    item
                    xs={12}
                >
                    <TextField
                        error={!isTransactionNameValid}
                        className={classes.input}
                        label="Transaction Name"
                        name="name"
                        variant="outlined"
                        color="primary"
                        required
                        onChange={handleChange}
                        helperText={isTransactionNameValid ? "" : "Required"}
                    />

                </Grid>

                <Grid
                    item
                    xs={12}
                >
                    <FormControl
                        variant="outlined"
                        required
                        color="primary"
                        error={!isAmountValid}
                    >
                        <InputLabel>Amount</InputLabel>
                        <OutlinedInput
                            className={classes.input}
                            label="Amount"
                            name="amount"
                            onChange={handleChange}
                            startAdornment={
                                <InputAdornment position="start">
                                    $
                                </InputAdornment>
                            }

                        />
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <FormControl
                        className={classes.formControl}
                        variant="outlined"
                        required
                    >
                        <InputLabel>Main Category</InputLabel>
                        <Select
                            label="Main Category"
                            value={transactionForm.main_category_id}
                            onChange={handleMainCategoryChange}
                            error={!isMainCategoryValid}
                        >
                            {categories.map(category => {
                                return (
                                    <MenuItem
                                        value={category.id}
                                        key={category.id}
                                    >{category.name}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={12}
                    style={isOtherCategoriesVisisble ? { display: 'block' } : { display: 'none' }}
                >
                    <FormGroup className={classes.formGroup} row>
                        {filteredCategories.map(category => {
                            return (
                                <FormControlLabel
                                    key={category.id}
                                    label={category.name}
                                    control={
                                        <Checkbox
                                            checked={transactionForm.category_ids.includes(category.id)}
                                            onChange={handleOtherCategoriesChange}
                                            name={category.id.toString()}
                                            color="primary"
                                        />
                                    }
                                />
                            )
                        })}
                    </FormGroup>
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        endIcon={<ArrowForwardIosIcon />}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>

    )
}

export default NewTransactionForm;
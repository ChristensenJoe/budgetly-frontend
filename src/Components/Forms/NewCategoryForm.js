import {
    Grid,
    makeStyles,
    useTheme,
    TextField,
    Button,
    InputAdornment,
    OutlinedInput,
    InputLabel,
    FormControl
} from '@material-ui/core'

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import {useHistory} from "react-router-dom";
import { useState } from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
        textAlign: 'center',
        marginTop: 30
    },
    input: {
        width: '300px'
    }
}));

function NewCategoryForm({userData}) {
    const history = useHistory();
    const theme = useTheme();
    const classes = useStyles(theme);
    const [isCategoryValid, setIsCategoryValid] = useState(true);
    const [isPercentageValid, setIsPercentageValid] = useState(true);
    const [categoryForm, setCategoryForm] = useState({
        name: "",
        percentage: ""
    })

    function handleChange(event) {
        setCategoryForm(categoryForm => {
            return {
                ...categoryForm,
                [event.target.name]: event.target.value
            }
        });
    }

    function onSubmitForm(event) {
        event.preventDefault();
        setIsCategoryValid(true);
        setIsPercentageValid(true);

        if(categoryForm.name === "") {
            setIsCategoryValid(false)
        }
        if(categoryForm.percentage === "") {
            setIsPercentageValid(false)
        } 

        if(categoryForm.name !== "" && categoryForm.percentage !== "") {
            const percentage = Number.parseInt(categoryForm.percentage, 10)/100
            const newCategory = {
                name: categoryForm.name,
                percentage: percentage,
                user_id: userData.id,
                balance: percentage * userData.balance
            }
            console.log("test: ", newCategory);

            fetch(`http://localhost:9292/categories`, {
                method: "POST",
                headers: { 
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(newCategory)
            })
            .then(res => res.json())
            .then(data => {
                history.push(`/${userData.username}`)
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
                        error={!isCategoryValid}
                        className={classes.input}
                        label="Category Name"
                        name="name"
                        variant="outlined"
                        color="primary"
                        required
                        onChange={handleChange}
                        helperText={isCategoryValid ? "" : "Required"}
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
                        error={!isPercentageValid}
                    >
                    <InputLabel>Percentage Of Income</InputLabel>
                    <OutlinedInput
                        className={classes.input}
                        label="Percentage Of Income"
                        name="percentage"
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                %
                            </InputAdornment>
                        }
                        
                    />
                    </FormControl>
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

export default NewCategoryForm;
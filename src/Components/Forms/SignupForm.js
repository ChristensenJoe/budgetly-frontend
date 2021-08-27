import {
    TextField,
    makeStyles,
    Typography,
    Grid,
    Button
} from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles({
    margin: {
        marginTop: 20,
        marginBottom: 20,
    },
    field: {
        width: "250px"
    },
    mainContainer: {
        marginTop: '30px',
        display: "inline-block",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    }
});

function SignupForm() {
    const classes = useStyles();
    const [signupDetails, setSignupDetails] = useState({
        username: "",
        password: ""
    })


    function handleSignupDetails(event) {
        setSignupDetails(signupDetails => {
            return {
                ...signupDetails,
                [event.target.name]: event.target.value
            }
        })
    }

    console.log(signupDetails)
    return (
        <div
            className={classes.mainContainer}
        > 
            <Typography
                className={classes.margin}
                variant="h4"
                color="primary"
            > 
                Sign Up
            </Typography>

            <form
                noValidate
                autoComplete="off"
            >
                <Grid
                    item
                    xs={12}
                >
                <TextField 
                    className={`${classes.margin} ${classes.field}`}
                    label="Username"
                    name="username"
                    variant="outlined"
                    color="primary"
                    required
                    onChange={handleSignupDetails}
                />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                <TextField 
                    className={`${classes.margin} ${classes.field}`}
                    label="Password"
                    name="password"
                    variant="outlined"
                    color="primary"
                    required
                    onChange={handleSignupDetails}
                />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Button
                        className={classes.margin}
                        color="primary"
                        variant="contained"
                    >
                        Sign Up
                    </Button>
                </Grid>
            </form>
        </div>
    );
}

export default SignupForm;
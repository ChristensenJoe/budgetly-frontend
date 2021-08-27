import {
    TextField,
    makeStyles,
    Typography,
    Grid,
    Button
} from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router-dom'

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

function LoginForm({ setUser, userList }) {
    const history = useHistory();
    const classes = useStyles();
    const [loginDetails, setLoginDetails] = useState({
        username: "",
        password: ""
    })

    function handleLoginDetails(event) {
        setLoginDetails(loginDetails => {
            return {
                ...loginDetails,
                [event.target.name]: event.target.value
            }
        })
    }
    function handleFormSubmit(e) {
        e.preventDefault();
        const user = userList.find(user => user.username === loginDetails.username);

        if (user) {
            setUser(user);
            history.push(`/${user.username}`)
        }
        else {
            alert("Wrong Username/Password");
        }
    }

    return (
        <div
            className={classes.mainContainer}
        >
            <Typography
                className={classes.margin}
                variant="h4"
                color="primary"
            >
                Log In
            </Typography>

            <form
                noValidate
                autoComplete="off"
                onSubmit={handleFormSubmit}
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
                        onChange={handleLoginDetails}
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
                        onChange={handleLoginDetails}
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
                        type="submit"
                    >
                        Log In
                    </Button>
                </Grid>
            </form>
        </div>
    );
}

export default LoginForm;
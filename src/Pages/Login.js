import {
    makeStyles,
    Grid,
    Typography,
    Box,
    ButtonGroup,
    Button
} from "@material-ui/core";
import Budgetly from "../Images/Budgetly.gif";
import BackgroundImage from "../Images/LoginBackground.webp";
import { useState } from "react";

import LoginForm from "../Components/Forms/LoginForm";
import SignupForm from "../Components/Forms/SignupForm";

const useStyles = makeStyles({
    root: {
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    leftSide: {
        height: "100vh",
        width: "40%",
        border: "1px solid black",
        backdropFilter: "blur(3px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    rightSide: {
        height: "100vh",
        width: "60%",
        border: "1px solid black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        height: "40vh",
        width: "40vh"
    },
    name: {
        fontWeight: 'bold',
        WebkitTextStroke: '1px black'
    },
    loginBox: {
        height: "50vh",
        width: "80%",
        border: "3px solid",
        display: "flex",
        padding: "10px",
        alignItems: "center",
        flexDirection: "column",
    }
});

function Login() {
    const classes = useStyles();
    const [isShowingLogin, setIsShowingLogin] = useState(true);

    return (
        <Grid
            container
            className={classes.root}
        >
            <Grid
                item
                className={classes.leftSide}
                xs={6}
            >
                <img
                    className={classes.image}
                    src={Budgetly}
                    alt="Logo"
                />
                <Typography
                    variant="h1"
                    color='primary'
                    className={classes.name}
                >
                    Budgetly
                </Typography>
            </Grid>
            <Grid
                item
                className={classes.rightSide}
                xs={6}
            >
                <Box
                    border={1}
                    color="primary.main"
                    borderRadius={16}
                    className={classes.loginBox}
                >
                    <ButtonGroup
                        color="secondary"
                        variant="contained"
                    >
                        <Button
                            onClick={() => setIsShowingLogin(true)}
                        >
                            Log In
                        </Button>
                        <Button
                            onClick={() => setIsShowingLogin(false)}
                        >
                            Sign Up
                        </Button>
                    </ButtonGroup>
                    {isShowingLogin ? <LoginForm/> : <SignupForm/>}
                </Box>
            </Grid>
        </Grid>
    );
}

export default Login;

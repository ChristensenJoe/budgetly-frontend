import {
    makeStyles,
    Grid,
    Typography,
    Box,
    ButtonGroup,
    Button,
    Divider
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
    },
    leftSide: {
        height: "100vh",
        width: "40%",
        backdropFilter: "blur(3px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    rightSide: {
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        height: "30vh",
        width: "30vh",
        marginBottom: -10
    },
    name: {
        fontWeight: 'bold',
        WebkitTextStroke: '1px black',
        marginBottom: 30
    },
    loginBox: {
        height: "50vh",
        width: "600px",
        border: "3px solid",
        display: "flex",
        padding: "10px",
        alignItems: "center",
        flexDirection: "column",
        backdropFilter: "blur(3px)",
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
            {/*
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
            </Grid> **/}
            
            <Grid
                item
                className={classes.rightSide}
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
                <Box
                    border={1}
                    color="primary.main"
                    borderRadius={16}
                    className={classes.loginBox}
                >
                    <ButtonGroup
                        color="secondary"
                        variant="contained"
                        style={{
                            marginTop: "20px"
                        }}
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

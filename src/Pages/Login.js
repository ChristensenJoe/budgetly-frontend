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
import { useState, useEffect } from "react";

import LoginForm from "../Components/Forms/LoginForm";
import SignupForm from "../Components/Forms/SignupForm";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: `url("https://www.transparenttextures.com/patterns/purty-wood.png")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh"
    },
    container: {
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
        color: theme.palette.primary.main,
        marginBottom: 30
    },
    loginBox: {
        height: "50vh",
        width: "600px",
        border: `3px solid ${theme.palette.primary.dark}`,
        display: "flex",
        padding: "10px",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: theme.palette.secondary.main
    }
}));

function Login({ setUser }) {
    const classes = useStyles();
    const [isShowingLogin, setIsShowingLogin] = useState(true);
    const [userList, setUserList] = useState([])


    useEffect(() => {
        fetch("http://localhost:9292/users")
        .then(res => res.json())
        .then(setUserList)
    }, []);

    return (
        <Grid
            container
            className={classes.root}
        >
            <Grid
                item
                className={classes.container}
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
                    color="primary.secondary"
                    borderRadius={16}
                    className={classes.loginBox}
                >
                    <ButtonGroup
                        color="secondary.light"
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

                    {
                        isShowingLogin
                            ?
                            <LoginForm
                                setUser={setUser}
                                userList={userList}
                            />
                            :
                            <SignupForm
                                setUser={setUser}
                            />
                    }
                </Box>
            </Grid>
        </Grid>
    );
}

export default Login;

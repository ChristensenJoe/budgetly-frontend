import {
    Grid,
    makeStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    Button
} from '@material-ui/core'

import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import UserBalance from '../Components/Cards/UserBalance'
import UserCategories from '../Components/Cards/UserCategories'
import UserRecentTransactions from '../Components/Cards/UserRecentTransactions'

const useStyles = makeStyles({
    root: {
        margin: 20,
        width: "80%",
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    leftGrid: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'start',
        textAlign: 'center'
    },
    rightGrid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        textAlign: 'center'
    },
    gridItems: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'top',
        textAlign: 'center'
    },
    dialogContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
    },
    dialogText: {
        textAlign: 'center',
        marginBottom: 40
    }
});


function Dashboard({ userData, setUser }) {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [dialogForm, setDialogForm] = useState({
        balance: 0.0,
        paycheck: 0.0,
        date1: "",
        date2: ""
    })

    if (!userData) {
        history.push("/login")
    }

    //New user dialog Box check
    useEffect(() => {
        if (userData.pay_dates === "") {
            setOpen(true);
        }
    }, [open, userData.pay_dates])

    function handleCloseDialog() {
        setOpen(false)
    }

    function handleDialogFormChange(e) {
        setDialogForm(dialogForm => {
            return {
                ...dialogForm,
                [e.target.name]: e.target.value
            }
        })
    }

    function onSubmitDialogForm(e) {
        e.preventDefault()
        let pay_dates = `${dialogForm.date1} ${dialogForm.date2}`;

        fetch(`http://localhost:9292/users/${userData.id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                balance: dialogForm.balance,
                paycheck: dialogForm.paycheck,
                pay_dates: pay_dates
            })
        })
        .then(res => res.json())
        .then(data => {
            setUser(data);
            setOpen(false);
        })
    }

    return (
        <>
            <Grid
                className={classes.root}
                container
                spacing={5}
            >
                <Grid
                    className={classes.leftGrid}
                    item
                    xs={12}
                    md={6}
                >
                    <Grid
                        container
                        spacing={5}
                    >
                        <Grid
                            className={classes.gridItems}
                            item
                            xs={12}
                        >
                            <UserBalance
                                userData={userData}
                            />
                        </Grid>
                        <Grid
                            className={classes.gridItems}
                            item
                            xs={12}
                        >
                            <UserRecentTransactions
                                userData={userData}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    className={classes.rightGrid}
                    item
                    xs={12}
                    md={6}
                >
                    <UserCategories
                        userData={userData}
                    />
                </Grid>
            </Grid>

            <Dialog
                open={open}
                onClose={handleCloseDialog}

            >
                <DialogTitle>
                    Welcome!
                </DialogTitle>
                <DialogContent
                    className={classes.dialogContent}
                >
                    <Typography
                        className={classes.dialogText}
                    >
                        It looks like you are a new user!
                        Please enter some initial information!
                    </Typography>
                    <form
                        onSubmit={onSubmitDialogForm}
                    >
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                xs={6}
                            >
                                <TextField
                                    name="date1"
                                    label="First PayDate"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleDialogFormChange}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={6}
                            >
                                <TextField
                                    name="date2"
                                    label="Second PayDate"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleDialogFormChange}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={6}
                            >
                                <TextField
                                    label="Paycheck Amount"
                                    name="paycheck"
                                    color="primary"
                                    variant="outlined"
                                    onChange={handleDialogFormChange}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={6}
                            >
                                <TextField
                                    label="Initial Balance"
                                    name="balance"
                                    color="primary"
                                    variant="outlined"
                                    onChange={handleDialogFormChange}
                                />
                            </Grid>
                            <Grid
                                className={classes.dialogContent}
                                item
                                xs={6}
                            >
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </>
    );
}

export default Dashboard;
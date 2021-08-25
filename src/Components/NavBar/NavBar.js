import React from 'react';
import { makeStyles, AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import budgetlyImg from "../../Images/Budgetly.png"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logoImage: {
    width: '50px',
    height: '50px',
    marginRight: 15
  }
}));

function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <img
            className={classes.logoImage}
            src={budgetlyImg}
            alt="Budgetly Logo"
          />
          <Typography variant="h6" className={classes.title}>
            Budgetly
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar
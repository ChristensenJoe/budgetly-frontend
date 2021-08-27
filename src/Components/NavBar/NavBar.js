import React, { useState } from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useTheme
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from "clsx";


import budgetlyImg from "../../Images/Budgetly.png";
import NavDrawer from '../Drawers/NavDrawer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
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
  },
  appBarShift: {
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 240,
  },
  typography: {
    color: theme.palette.secondary.main
  }
}));

function NavBar({ userData, categories }) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [isOpen, setIsOpen] = useState(false)
  

  function handleDrawerClick() {
    setIsOpen((isOpen) => !isOpen)
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar
          className={clsx({
            [classes.appBarShift]: isOpen
          })}
          position="static"

        >
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="secondary"
              aria-label="menu"
              onClick={handleDrawerClick}
            >
              <MenuIcon />
            </IconButton>
            <img
              className={classes.logoImage}
              src={budgetlyImg}
              alt="Budgetly Logo"
            />
            <Typography variant="h6" color="secondary" className={classes.title}>
              Budgetly
            </Typography>
            <Button color="secondary">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
      <NavDrawer
        isOpen={isOpen}
        handleDrawerClick={handleDrawerClick}
        categories={categories}
        userData={userData}
      />
    </>
  );
}

export default NavBar
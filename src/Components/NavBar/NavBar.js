import React, { useState } from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from "clsx";

import { useEffect } from "react"

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
}));

function NavBar({ userData }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9292/categories?user_id=${userData.id}`)
      .then(res => res.json())
      .then(setCategories);
  }, [])

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
              color="inherit"
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
            <Typography variant="h6" className={classes.title}>
              Budgetly
            </Typography>
            <Button color="inherit">Login</Button>
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
import {
    Drawer,
    Typography,
    makeStyles,
    useTheme,
    IconButton,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse
} from '@material-ui/core'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import ClassIcon from '@material-ui/icons/Class';
import DescriptionIcon from '@material-ui/icons/Description';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { Link } from "react-router-dom"
import { useState } from 'react'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerHeader: {
        width: drawerWidth,
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    nested: {
        paddingLeft: theme.spacing(4)
    }
}))

function NavDrawer({ userData, categories, isOpen, handleDrawerClick }) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [isNestedOpen, setIsNestedOpen] = useState(false);

    function handleNestedClick() {
        setIsNestedOpen((isNestedOpen) => !isNestedOpen)
    }
    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={isOpen}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClick}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />

            <div>

                <List
                    component="nav"
                >
                    <ListItem
                        button
                        component={Link}
                        to={`/${userData.username}`}
                    >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Home"
                        />
                    </ListItem>
                    <Divider />
                    <ListItem
                        button
                        onClick={handleNestedClick}
                    >
                        <ListItemIcon>
                            <ClassIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={
                                <Typography>
                                    Categories
                                </Typography>
                            }
                        />
                        {isNestedOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Divider />
                    <Collapse
                        in={isNestedOpen}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List
                            component="div"
                            disablePadding
                        >
                            {
                                categories.map(category => {
                                    return (
                                        <ListItem
                                            key={category.id}
                                            component={Link}
                                            button
                                            className={classes.nested}
                                            to={`/${userData.username}/${category.name}`}
                                        >
                                            <ListItemText
                                                inset
                                                primary={
                                                    <Typography
                                                        variant="body1"
                                                    >
                                                        {category.name}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                    );
                                })
                            }
                            <Divider variant="inset" />
                            <ListItem
                                component={Link}
                                button
                                className={classes.nested}
                                to={`/${userData.username}/create-category`}
                            >
                                <ListItemText
                                    inset
                                    primary={
                                        <Typography
                                            variant="body1"
                                        >
                                            Create Category
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Collapse>
                    <Divider />
                    <ListItem
                        button
                        component={Link}
                        to={`/${userData.username}/transactions`}
                    >
                        <ListItemIcon>
                            <DescriptionIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Transactions"
                        />
                    </ListItem>
                    <Divider />
                </List>
            </div>
        </Drawer>
    );
}

export default NavDrawer;
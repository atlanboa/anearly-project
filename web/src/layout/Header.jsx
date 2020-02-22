import React from "react";
import {
  makeStyles,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Grid
} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import MyTabs from "../components/common/MyTabs";
import HeaderRight from "../components/common/HeaderRight";
import { transparent } from "material-ui/styles/colors";
import { white } from "material-ui/styles/colors";
import { Link } from "react-router-dom";

import logo from '../assets/logo_noText.PNG';

const useStyles = makeStyles(theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  appBar: {
    padding: 0,
    backgroundColor: white
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    cursor: "pointer",
    fontSize: 30,
  },
  logoImg: {
    height: 30,
  },
}));

const Header = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };
  const drawerItem = [
    { label: "Main", path: "/VoteMain" },
    { label: "SignUp", path: "/SignUp" },
    { label: "CreateSurvey", path: "/CreateSurvey" },
    { label: "MyPage", path: "/MyPage" },
  ];
  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {drawerItem.map(
          ({label, path}) => (<ListItem button key={label} component={Link} to={path}>
            <ListItemText primary={label}></ListItemText>
          </ListItem>)
        )}
      </List>
    </div>
  );

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Grid
          justify="space-between" // Add it here :)
          container
          spacing={2}
        >
          <Hidden mdUp>
            <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={toggleDrawer("left", true)}
              edge="start"
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <a href="/">
            <button style={{ backgroundColor: transparent, border: 0 }}>
              <Typography variant="h6" className={classes.title}>
                An-Early
              </Typography>
            </button>
          </a>
          <MyTabs />
          <HeaderRight />
        </Grid>
      </Toolbar>
      <Hidden mdUp>
        <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
          {sideList("left")}
        </Drawer>
      </Hidden>
    </AppBar>
  );
};

export default Header;

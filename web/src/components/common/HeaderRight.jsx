import React from "react";
import { makeStyles, Box, Button } from "@material-ui/core";
import { transparent } from "material-ui/styles/colors";
import { CommonConsumer } from "../../context/CommonContext";
import { black } from "material-ui/styles/colors";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  link: {
    backgroundColor: transparent,
    color: black
  }
}));

const HeaderRight = props => {
  const classes = useStyles();
  const logout = (actions) => {
    actions.setLogged(false);
    localStorage.removeItem("token");
    actions.setToken('');
    window.location.href='/'
    alert('로그아웃 되었습니다.')
  }
  return(
    <CommonConsumer>{
      ({state, actions}) => (
          state.isLogged ? 
            (
              <Box textAlign="right">
                <Link to={"/MyPage"}>
                    <Button className={classes.link}>MyPage</Button>
                  </Link>
                <Button onClick={() => logout(actions)} className={classes.link}>
                  LogOut
                </Button>
              </Box>
            ) :
            (
              <Box textAlign="right">
                <a href="/SignUp">
                  <Button className={classes.link}>SignUp</Button>
                </a>
                /&nbsp;&nbsp;
                <a href="/LogIn">
                <Button className={classes.link}>
                  LogIn
                </Button>
                </a>
              </Box>
            )
          )
      }
    </CommonConsumer>
  );
};

export default HeaderRight;

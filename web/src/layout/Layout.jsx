import React, { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";

import { CssBaseline, Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  content: {
    margin: "0 auto",
    padding: 0,
  },
  container: {
    marginTop: "100px",
    marginBottom: "30px",
  }
}));

const Layout = props => {
  const classes = useStyles();

  return (
    <Fragment>
      <CssBaseline />
      <Header />
      <Container className={classes.container} maxWidth={false}>
        <div className={classes.content}>{props.children}</div>
      </Container><hr/>
      <Footer />
    </Fragment>
  );
};

export default Layout;

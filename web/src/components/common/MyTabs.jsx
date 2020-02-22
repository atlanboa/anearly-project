import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { transparent } from "material-ui/styles/colors";
import { Hidden } from "@material-ui/core";
import { Link } from "react-router-dom";
import { black } from "material-ui/styles/colors";
const useStyles = makeStyles({
  root: {
    width: "40%",
    maxWidth: "900px",
    backgroundColor: transparent,
    flexGrow: 1,
    marginLeft: "20px"
  },
  label: {
    color: black
  }
});

export default function MyTabs() {
  const classes = useStyles();

  const tabs = [
    { label: "Main", path: "/VoteMain" },
    { label: "CreateSurvey", path: "/CreateSurvey" },
  ];
  return (
    <Hidden smDown>
      <Paper
        className={classes.root}
        elevation={0}
      >
        <Tabs
          className={classes.tabs}
          value={0}
          //onChange={handleChange}
          TabIndicatorProps={{ style: { backgroundColor: "transparent" } }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map(({ label, path }) => (
            <Tab
              key={label}
              label={<span className={classes.label}>{label}</span>}
              component={Link}
              to={path}
            ></Tab>
          ))}
        </Tabs>
      </Paper>
    </Hidden>
  );
}

import React, { useState } from "react";
import Layout from "../layout/Layout";
import VoteGridList from "../components/main/VoteGridList";
import PrioritySurvey from "../components/main/PrioritySurvey";
import VoteGridTitle from "../components/main/VoteGridTitle";
import {
  makeStyles, 
  ThemeProvider,
  createMuiTheme,
  Grid,
  IconButton
} from "@material-ui/core";

import { ViewContext } from "../context/ViewContext";
import TextField from "@material-ui/core/TextField";
import { green } from "@material-ui/core/colors";
import SearchIcon from "@material-ui/icons/Search";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";


const useStyles = makeStyles(theme => ({
  onList: {
    marginBottom: "15px"
  },
  margin: {
    width: "100%",
    float: "right"
  },
  searchGrid: {
    transition: "width .35s linear",
    visibility: "hidden",
    width: "0%"
  },
  searchGridFocused: {
    visibility: "visible",
    width: "80%"
  },
  textGrid: {
    maginLeft:'30px',
    backgroundColor:'#f5f5f0'
    
  }
}));
const theme = createMuiTheme({
  palette: {
    primary: green
  }
});

const VoteMain = (props) => {
  const classes = useStyles();
  const [searching, setSearching] = useState(false);
  const [label, setLabel] = useState("");
  const sleep = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };
  async function openSearchBar() {
    setSearching(true);
    await sleep(30);
  }
  async function closeSearchBar() {
    setSearching(false);
    setLabel("");
  }
  const inputsearch = (text) => {
    setLabel(text.target.value);
  }
  return (
    <ViewContext.Provider value={{}}>
      <Layout>
        <Grid container justify="space-between">
          <Grid item xs={8}>
            <PrioritySurvey />
          </Grid>
          <Grid item xs={4} className={classes.textGrid}>
            <VoteGridTitle
              item={{
                title: `An-Early`,
                subtitle: `Simple, Best, Product Survey`
              }}
            />
          </Grid>
        </Grid>
        
        <Grid container justify="space-between" className={classes.onList}>
          <Grid item xs={8}>
            
          </Grid>
          <Grid container item xs={4}  justify="flex-end">
            {searching ? (
              <Grid style={{ width: "20%" }}>
                <IconButton
                  aria-label="Search"
                  style={{ float: "right" }}
                  onClick={() => closeSearchBar()}
                >
                  <DoubleArrowIcon fontSize="large" />
                </IconButton>
              </Grid>
            ) : (
              <Grid style={{ width: "20%", color: "#0f4c81" }}>
                <IconButton
                  aria-label="Search"
                  color="primary"
                  style={{ float: "right" }}
                  onClick={() => openSearchBar()}
                >
                  <SearchIcon fontSize="large" />
                </IconButton>
              </Grid>
            )}
            <Grid
              className={[
                classes.searchGrid,
                searching && classes.searchGridFocused
              ].join(" ")}
            >
              {searching ? 
              (<ThemeProvider theme={theme}>
                <TextField
                  className={classes.margin}
                  label="Search"
                  onChange = {inputsearch}
                  variant="outlined"
                  id="mui-theme-provider-outlined-input"
                  style={{backgroundColor:"rgba(173, 195, 215, 0.1)"}}
                />
              </ThemeProvider>) : (<div></div>)
}
            </Grid>
          </Grid>
        </Grid>
        
        <VoteGridList label={label}/>
      </Layout>
    </ViewContext.Provider>
  );
};

export default VoteMain;

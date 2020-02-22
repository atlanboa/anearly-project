import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { CommonProvider } from "./context/CommonContext";

import NotFound from "./pages/NotFound";
import VoteMain from "./pages/VoteMain";
// import VoteResult from "./pages/VoteResult";
import SignUp from "./pages/SignUp";
import CreateSurvey from "./pages/CreateSurvey";
import MyPage from "./pages/MyPage";
import LogIn from "./pages/LogIn";
import ProductDetail from "./pages/ProductDetail";
import AdminPage from "./pages/AdminPage";
import Chatt from "./components/mypage/Chatt"

import "./index.css";

const theme = createMuiTheme({
  drawerWidth: 320,
  palette: {
    primary: {
      main: "#0f4c81"
    },
  },
  typography: {
    fontFamily: ["Noto Sans KR"].join(","),
    button: {
      fontFamily: "Noto Sans KR"
    },
    body1: {
      fontWeight: 500
    }
  },
});

const App = (props) => {
  return (
    <CommonProvider>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={VoteMain} />
            <Route path="/VoteMain" component={VoteMain} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/CreateSurvey" component={CreateSurvey} />
            <Route path="/MyPage" component={MyPage} />
            <Route path="/LogIn" component={LogIn} />
            {/* <Route path="/VoteResult" component={VoteResult} /> */}
            <Route path="/ProductDetail/:index" component={ProductDetail} />
            <Route path="/Chatt" component={Chatt} />
            <Route path="/AdminPage" component={AdminPage} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </BrowserRouter>        
      </MuiThemeProvider>
    </CommonProvider>
  );
};

export default App;

import React from "react";
import Layout from "../layout/Layout";
import LogInComponent from "../components/auth/LogInComponent";
import { ViewContext } from "../context/ViewContext";

const LogIn = props => {
  return (
    <ViewContext.Provider value={{}}>
      <Layout>
          <LogInComponent />
      </Layout>
    </ViewContext.Provider>
  );
};

export default LogIn;

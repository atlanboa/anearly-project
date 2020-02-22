import React from "react";
import Layout from "../layout/Layout";
import { ViewContext } from "../context/ViewContext";
import SignUpComponent from "../components/auth/SignUpComponent";

const SignUp = props => {
  return (
    <ViewContext.Provider value={{}}>
      <Layout>
        <SignUpComponent />
      </Layout>
    </ViewContext.Provider>
  );
};

export default SignUp;


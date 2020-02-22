import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.css'
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from 'axios';

axios.interceptors.response.use((response)=>{
    console.log('interceptors ::: ', response)
    return response;
}, (error) =>{
    if(error.response.data.message==="non-token"){
        localStorage.setItem("nonToken", "!!");
        localStorage.removeItem("token");
        window.location.href = '/LogIn'
    }
    return Promise.reject(error);
})

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();

import React, {useState, createContext,useEffect } from "react";

const Context = createContext();

const {Provider, Consumer: CommonConsumer} = Context;

const CommonProvider = (props) => {
    const [isLogged, setLogged] = useState(false);
    const [login, setLogin] = useState({"email":'', "id":'', "nickname":'', "reward_point":''});
    const [token, setToken] = useState("");
    useEffect(()=>{
        if(localStorage.getItem("token")!==null){
            setToken(localStorage.getItem("token"));
            setLogged(true);
        }else{
            setLogged(false);
        }
    },[]);
    const state = {
        login,
        token,
        isLogged
    };
    const actions = {
        setLogin,
        setToken,
        setLogged
    };
    return (
        <Provider value={{state, actions}}>
            {props.children}
        </Provider>
    );
}

export {CommonProvider, CommonConsumer};

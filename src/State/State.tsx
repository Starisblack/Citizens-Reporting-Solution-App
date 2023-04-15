import React, { createContext, useReducer } from "react";

export interface userContext {
    state: {
        loading: boolean
    };
    dispatch: any;
  }


let AppContext = createContext<userContext>({} as userContext);

const initialState = {
  count: 0,
  auth: false,
  loading: false
}

let reducer = (state: any, action: any) => {
  switch(action.type) {
    case "setCount": {
      return { ...state, count: action.count }
    }
     
    case "startLoading": return {...state, loading: true}
    case "dismissLoading": return {...state, loading: false}
    case "login" : return {...state, auth: !state.auth, loading: false}
    case "signUp" : return {...state, auth: !state.auth, loading: false}
    case "logOut" : return {...state, auth: false}
    }
  return state;
};


function AppContextProvider(props: any) {
  const fullInitialState = {
    ...initialState
  }

  let [state, dispatch] = useReducer(reducer, fullInitialState);
  let value = { state, dispatch };

 

  return (
    <AppContext.Provider value={value} >{props.children}</AppContext.Provider>
  );
}

let AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
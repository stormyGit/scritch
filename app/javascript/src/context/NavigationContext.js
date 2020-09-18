import {AppReducer, initialState} from "../reducers/AppReducer";
import React, {createContext, useReducer} from "react";

const NavigationContext = createContext({isLoggedIn: false, isDrawerOpen: false, dispatchNavigation: undefined});

const NavigationContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  return (
    <NavigationContext.Provider value={{isLoggedIn: state.isLoggedIn, isDrawerOpen: state.isDrawerOpen, dispatch}}>
      {children}
    </NavigationContext.Provider>
  )
}

export {NavigationContext, NavigationContextProvider};
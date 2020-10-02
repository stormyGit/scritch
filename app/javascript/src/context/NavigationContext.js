import {NavigationReducer, initialState} from "../reducers/NavigationReducer";
import React, {createContext, useReducer} from "react";

const NavigationContext = createContext({isLoggedIn: false, isDrawerOpen: false, dispatchNavigationChange: undefined});

const NavigationContextProvider = ({children}) => {
  const [state, dispatchNavigationChange] = useReducer(NavigationReducer, initialState)

  return (
    <NavigationContext.Provider value={{isLoggedIn: state.isLoggedIn, isDrawerOpen: state.isDrawerOpen, dispatchNavigationChange}}>
      {children}
    </NavigationContext.Provider>
  )
}

export {NavigationContext, NavigationContextProvider};
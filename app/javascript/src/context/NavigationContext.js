import {initialState, NavigationReducer} from "../reducers/NavigationReducer";
import React, {createContext, useReducer} from "react";

const NavigationContext = createContext({isLoggedIn: false, isDrawerOpen: false, scrollAmount: 0,isDialogOpen:false, dispatchNavigationChange: undefined});

const NavigationContextProvider = ({children}) => {
  const [state, dispatchNavigationChange] = useReducer(NavigationReducer, initialState)

  return (
    <NavigationContext.Provider value={{
      isLoggedIn: state.isLoggedIn,
      isDrawerOpen: state.isDrawerOpen,
      scrollAmount: state.scrollAmount,
      isDialogOpen:state.isDialogOpen,
      dispatchNavigationChange
    }}>
      {children}
    </NavigationContext.Provider>
  )
}

export {NavigationContext, NavigationContextProvider};
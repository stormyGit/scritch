import {AppReducer, initialState} from "../reducers/AppReducer";
import {createContext, useReducer} from "react";

const DialogContext = createContext({isLoggedIn: false, isDrawerOpen: false, dispatch: undefined});

const DialogContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  return (
    <DialogContext.Provider value={{isLoggedIn: state.isLoggedIn, isDrawerOpen: state.isDrawerOpen, dispatch: dispatchNavigation}}>
      {children}
    </DialogContext.Provider>
  )
}

export {DialogContext, DialogContextProvider};
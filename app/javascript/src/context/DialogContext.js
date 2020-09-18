import {DialogReducer, initialState} from "../reducers/DialogReducer";
import React, {createContext, useReducer} from "react";

const DialogContext = createContext({
  getUploadDialogState: false,
  getSignUpDialogState: false,
  getActivitiesDialogState: false,
  getChatDialogState: false,
  getSpeciesDialogState: false,
  getSettingsDialogState: false,
  getAdvertiseDialogState: false,
  getTechDialogState: false,
  dispatchDialogChange: undefined
});

const DialogContextProvider = ({children}) => {
  const [state, dispatchDialogChange] = useReducer(DialogReducer, initialState)

  return (
    <DialogContext.Provider
      value={{
        getUploadDialogState: state.getUploadDialogState,
        getSignUpDialogState: state.getSignUpDialogState,
        getActivitiesDialogState: state.getActivitiesDialogState,
        getChatDialogState: state.getChatDialogState,
        getSpeciesDialogState: state.getSpeciesDialogState,
        getSettingsDialogState: state.getSettingsDialogState,
        getAdvertiseDialogState: state.getAdvertiseDialogState,
        getTechDialogState: state.getTechDialogState,
        dispatchDialogChange
      }}>
      {children}
    </DialogContext.Provider>
  )
}

export {DialogContext, DialogContextProvider};
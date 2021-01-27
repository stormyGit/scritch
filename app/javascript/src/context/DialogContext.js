import {DialogReducer, initialState} from "../reducers/DialogReducer";
import React, {createContext, useReducer} from "react";

const DialogContext = createContext({
  getUploadDialogState: false,
  getSignUpDialogState: false,
  getActivitiesDialogState: false,
  getChatDialogState: false,
  getSpeciesDialogState: false,
  getSettingsDialogState: false,
  getAdvertisementDialogState: false,
  getTechDialogState: false,
  getAssetRequestEventDialogState: false,
  getAssetRequestMakerDialogState: false,
  getAssetRequestFursuitDialogState: false,
  getSearchDialogState:false,
  dispatchDialogChange: ()=>{}
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
        getAdvertisementDialogState: state.getAdvertisementDialogState,
        getAssetRequestEventDialogState: state.getAssetRequestEventDialogState,
        getAssetRequestMakerDialogState: state.getAssetRequestMakerDialogState,
        getAssetRequestFursuitDialogState: state.getAssetRequestFursuitDialogState,
        getTechDialogState: state.getTechDialogState,
        getSearchDialogState: state.getSearchDialogState,
        dispatchDialogChange
      }}>
      {children}
    </DialogContext.Provider>
  )
}

export {DialogContext, DialogContextProvider};
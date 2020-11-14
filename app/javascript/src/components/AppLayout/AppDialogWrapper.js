import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import withCurrentSession from '../withCurrentSession'
import withWidth from '@material-ui/core/withWidth'
import AppDialogs from './AppDialogs'
import {
  setActivitiesDialogState,
  setAdvertisementDialogState,
  setAssetRequestEventDialogState,
  setAssetRequestFursuitDialogState,
  setAssetRequestMakerDialogState,
  setChatDialogState,
  setSearchDialogState,
  setSettingsDialogState,
  setSignupDialogState,
  setSpeciesDialogState,
  setTechDialogState,
  setUploadDialogState,
} from '../../reducers/Action'
import React, { createRef, useContext, useEffect, useRef, useState } from 'react'
import { DialogContext } from '../../context/DialogContext'

// static class HistoryListener {
//   listener = history.listener()

//   initialize = ()
// }

const styles = (theme) => ({})
const AppDialogWrapper = (props) => {
  const {
    classes,
    settingsLayout,
    children,
    currentSession,
    location,
    client,
    width,
    history,
  } = props
  const {
    dispatchDialogChange,
    getUploadDialogState,
    getSignUpDialogState,
    getActivitiesDialogState,
    getChatDialogState,
    getSpeciesDialogState,
    getSettingsDialogState,
    getAdvertiseDialogState,
    getTechDialogState,
    getAssetRequestEventDialogState,
    getAssetRequestMakerDialogState,
    getAssetRequestFursuitDialogState,
    getSearchDialogState,
  } = useContext(DialogContext)
  const [mainDrawer, setMainDrawer] = useState(true)
  const [tempDrawer, setTempDrawer] = useState(false)
  const [searchEnabled, setSearchEnabled] = useState(false)
  const [query, setQuery] = useState({})
  const ref = createRef()

  // React.useEffect(() => {
  //   HistoryListener.listener.backButtonPressed(() => {
  //     let changed = false
  //     if (dialogState1) {
  //       dispatch(setDialogState1(false))
  //       changed = true
  //     }
  //     if (dialogState2) {
  //       dispatch(setDialogState2(false))
  //       changed = true
  //     }
  //     if (dialogState3) {
  //       dispatch(setDialogState3(false))
  //       changed = true
  //     }
  //     if (dialogState4) {
  //       dispatch(setDialogState4(false))
  //       changed = true
  //     }

  //     if (changed) {
  //       backButtonPress.cancel()
  //     }
  //   })
  // }, [dialogState1, dialogState2, dialogState3, dialogState4])

  // useEffect(() => {
  //   console.log("useEffect")
  //   let currentPathname;
  //   let currentSearch;
  //   let unlisten = HistoryListener.listener((newLocation, action) => {
  //     console.log(newLocation, action);
  //     if (action === "PUSH") {
  //       if (
  //         newLocation.pathname !== currentPathname ||
  //         newLocation.search !== currentSearch
  //       ) {
  //         currentPathname = newLocation.pathname;
  //         currentSearch = newLocation.search;

  //         history.push({
  //           pathname: newLocation.pathname,
  //           search: newLocation.search
  //         });
  //       }
  //     } else {
  //       if (true) { //TODO instead of true, try to check for getSearchDialogState
  //         dispatchDialogChange(setSearchDialogState(false));
  //         history.goForward();
  //         console.log("forward");
  //       } else {
  //         // history.goBack();
  //         console.log("backward");
  //       }
  //     }
  //   });

  //   return () => {
  //     if (unlisten != null) {
  //       console.log("unlisten")
  //       unlisten();
  //     }
  //   };
  // }, []);

  const dispatch = (state) => {
    dispatchDialogChange(state)
  }

  return (
    <AppDialogs
      searchDialog={getSearchDialogState}
      closeSearchDialog={() => dispatch(setSearchDialogState(false))}
      chatDialog={getChatDialogState}
      closeChatDialog={() => dispatch(setChatDialogState(false))}
      signUpDialog={getSignUpDialogState}
      closeSignUpDialog={() => dispatch(setSignupDialogState(false))}
      uploadDialog={getUploadDialogState}
      closeUploadDialog={() => dispatch(setUploadDialogState(false))}
      activitiesDialog={getActivitiesDialogState}
      closeActivitiesDialog={() => dispatch(setActivitiesDialogState(false))}
      advertiseDialog={getAdvertiseDialogState}
      closeAdvertiseDialog={() => dispatch(setAdvertisementDialogState(false))}
      settingsDialog={getSettingsDialogState}
      closeSettingsDialog={() => dispatch(setSettingsDialogState(false))}
      techDialog={getTechDialogState}
      closeTechDialog={() => dispatch(setTechDialogState(false))}
      speciesDialog={getSpeciesDialogState}
      closeSpeciesDialog={() => dispatch(setSpeciesDialogState(false))}
      assetRequestEventDialog={getAssetRequestEventDialogState}
      closeAssetRequestEventDialog={() => dispatch(setAssetRequestEventDialogState(false))}
      assetRequestMakerDialog={getAssetRequestMakerDialogState}
      closeAssetRequestMakerDialog={() => dispatch(setAssetRequestMakerDialogState(false))}
      assetRequestFursuitDialog={getAssetRequestFursuitDialogState}
      closeAssetRequestFursuitDialog={() => dispatch(setAssetRequestFursuitDialogState(false))}
    />
  )
}

export default withStyles(styles)(withRouter(withCurrentSession(withWidth()(AppDialogWrapper))))

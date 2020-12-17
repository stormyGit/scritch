import {withStyles} from '@material-ui/core/styles'
import {withRouter} from 'react-router-dom'
import withCurrentSession from '../withCurrentSession'
import withWidth from '@material-ui/core/withWidth'
import AppDialogs from './AppDialogs'
import {setActivitiesDialogState, setAdvertisementDialogState, setAssetRequestEventDialogState, setAssetRequestFursuitDialogState, setAssetRequestMakerDialogState, setChatDialogState, setSearchDialogState, setSettingsDialogState, setSignupDialogState, setSpeciesDialogState, setTechDialogState, setUploadDialogState,} from '../../reducers/Action'
import React, {useContext, useState} from 'react'
import {DialogContext} from '../../context/DialogContext'
import {_HistoryListener} from "../../util/history";

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
    getAdvertisementDialogState,
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

  _HistoryListener.initialize(history);

  // React.useEffect(() => {
  //     console.log("AppDialogWrapper.useEffect called.")
  //     _HistoryListener.stayCondition = () => {
  //       return getUploadDialogState ||
  //         getSignUpDialogState ||
  //         getActivitiesDialogState ||
  //         getChatDialogState ||
  //         getSpeciesDialogState ||
  //         getSettingsDialogState ||
  //         getAdvertisementDialogState ||
  //         getTechDialogState ||
  //         getAssetRequestEventDialogState ||
  //         getAssetRequestMakerDialogState ||
  //         getAssetRequestFursuitDialogState ||
  //         getSearchDialogState;
  //     }
  //     if (_HistoryListener.stayCondition())
  //       history.push("?dialogOpen", "useEffect");
  //   }, [getUploadDialogState,
  //     getSignUpDialogState,
  //     getActivitiesDialogState,
  //     getChatDialogState,
  //     getSpeciesDialogState,
  //     getSettingsDialogState,
  //     getAdvertisementDialogState,
  //     getTechDialogState,
  //     getAssetRequestEventDialogState,
  //     getAssetRequestMakerDialogState,
  //     getAssetRequestFursuitDialogState,
  //     getSearchDialogState]
  // )
  //
  // if (_HistoryListener.dispatchChange) {
  //   if (getUploadDialogState)
  //     dispatchDialogChange(setUploadDialogState(false))
  //   if (getSignUpDialogState)
  //     dispatchDialogChange(setSignupDialogState(false))
  //   if (getActivitiesDialogState)
  //     dispatchDialogChange(setActivitiesDialogState(false))
  //   if (getChatDialogState)
  //     dispatchDialogChange(setChatDialogState(false))
  //   if (getSpeciesDialogState)
  //     dispatchDialogChange(setSpeciesDialogState(false))
  //   if (getSettingsDialogState)
  //     dispatchDialogChange(setSettingsDialogState(false))
  //   if (getAdvertisementDialogState)
  //     dispatchDialogChange(setAdvertisementDialogState(false))
  //   if (getTechDialogState)
  //     dispatchDialogChange(setTechDialogState(false))
  //   if (getAssetRequestEventDialogState)
  //     dispatchDialogChange(setAssetRequestEventDialogState(false))
  //   if (getAssetRequestMakerDialogState)
  //     dispatchDialogChange(setAssetRequestMakerDialogState(false))
  //   if (getAssetRequestFursuitDialogState)
  //     dispatchDialogChange(setAssetRequestFursuitDialogState(false))
  //   if (getSearchDialogState)
  //     dispatchDialogChange(setSearchDialogState(false))
  //   _HistoryListener.dispatchChange = false;
  // }

  return (
    <AppDialogs
      searchDialog={getSearchDialogState}
      closeSearchDialog={() => dispatchDialogChange(setSearchDialogState(false))}
      chatDialog={getChatDialogState}
      closeChatDialog={() => dispatchDialogChange(setChatDialogState(false))}
      signUpDialog={getSignUpDialogState}
      closeSignUpDialog={() => dispatchDialogChange(setSignupDialogState(false))}
      uploadDialog={getUploadDialogState}
      closeUploadDialog={() => dispatchDialogChange(setUploadDialogState(false))}
      activitiesDialog={getActivitiesDialogState}
      closeActivitiesDialog={() => dispatchDialogChange(setActivitiesDialogState(false))}
      advertiseDialog={getAdvertisementDialogState}
      closeAdvertiseDialog={() => dispatchDialogChange(setAdvertisementDialogState(false))}
      settingsDialog={getSettingsDialogState}
      closeSettingsDialog={() => dispatchDialogChange(setSettingsDialogState(false))}
      techDialog={getTechDialogState}
      closeTechDialog={() => dispatchDialogChange(setTechDialogState(false))}
      speciesDialog={getSpeciesDialogState}
      closeSpeciesDialog={() => dispatchDialogChange(setSpeciesDialogState(false))}
      assetRequestEventDialog={getAssetRequestEventDialogState}
      closeAssetRequestEventDialog={() => dispatchDialogChange(setAssetRequestEventDialogState(false))}
      assetRequestMakerDialog={getAssetRequestMakerDialogState}
      closeAssetRequestMakerDialog={() => dispatchDialogChange(setAssetRequestMakerDialogState(false))}
      assetRequestFursuitDialog={getAssetRequestFursuitDialogState}
      closeAssetRequestFursuitDialog={() => dispatchDialogChange(setAssetRequestFursuitDialogState(false))}
    />
  )
}

export default withStyles(styles)(withRouter(withCurrentSession(withWidth()(AppDialogWrapper))))

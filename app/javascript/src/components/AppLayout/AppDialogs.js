import React, {useEffect, useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import withCurrentSession from "../withCurrentSession";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import MultipleMediaDialog from "../Media/UploadMediaDialog";
import ChatDialog from "../AppDialogs/ChatDialog";
import ActivitiesDialog from "../AppDialogs/ActivitiesDialog";
import SettingsDialog from "../AppDialogs/SettingsDialog";
import AdvertiseDialog from "../AppDialogs/AdvertiseDialog";
import SignUpDialog from "../AppDialogs/SignUpDialog";
import TechDialog from "../AppDialogs/TechDialog";
import SpeciesDialog from "../AppDialogs/SpeciesDialog";
import GlobalSearchDialog from "../AppDialogs/GlobalSearchDialog";
import AssetRequestDialog from "../AppDialogs/AssetRequestDialog";
import {withRouter} from "react-router-dom";
import {setSearchDialogState} from "../../reducers/Action";

const styles = theme => ({
  close: {
    padding: theme.spacing(0.5)
  }
});

const AppDialogs = props => {
  const {
    classes,
    currentSession,
    uploadDialog,
    signUpDialog,
    settingsDialog,
    techDialog,
    speciesDialog,
    activitiesDialog,
    advertiseDialog,
    chatDialog,
    searchDialog,
    assetRequestFursuitDialog,
    assetRequestMakerDialog,
    assetRequestEventDialog,
    history,
    location
  } = props;
  const closeSnack = () => setSnack(false);
  const openSnack = () => setSnack(true);
  const [snack, setSnack] = useState(false);

  return (
    <React.Fragment>
      {!currentSession && (
        <SignUpDialog open={signUpDialog} onClose={() => props.closeSignUpDialog()}/>
      )}
      {currentSession && (
        <MultipleMediaDialog
          open={uploadDialog}
          onClose={() => props.closeUploadDialog()}
          uploadEnabled
        />
      )}
      {currentSession && (
        <ChatDialog open={chatDialog} onClose={() => props.closeChatDialog()}/>
      )}
      {currentSession && (
        <ActivitiesDialog
          open={activitiesDialog}
          onClose={() => props.closeActivitiesDialog()}
        />
      )}
      {currentSession && (
        <SettingsDialog open={settingsDialog} onClose={() => props.closeSettingsDialog()}/>
      )}
      {currentSession && (
        <AssetRequestDialog
          open={assetRequestEventDialog}
          keepAssetType="Event"
          onClose={() => props.closeAssetRequestEventDialog()}
          assetType="Event"
          submitSnack={openSnack}
        />
      )}
      {currentSession && (
        <AssetRequestDialog
          open={assetRequestMakerDialog}
          keepAssetType="Maker"
          onClose={() => props.closeAssetRequestMakerDialog()}
          assetType="Maker"
          submitSnack={openSnack}
        />
      )}
      {currentSession && (
        <AssetRequestDialog
          open={assetRequestFursuitDialog}
          keepAssetType="Fursuit"
          onClose={() => props.closeAssetRequestFursuitDialog()}
          assetType="Fursuit"
          submitSnack={openSnack}
        />
      )}
      {currentSession && (
        <AdvertiseDialog
          open={advertiseDialog}
          onClose={() => props.closeAdvertiseDialog()}
        />
      )}
      {currentSession && (
        <SpeciesDialog open={speciesDialog} onClose={() => props.closeSpeciesDialog()}/>
      )}
      <TechDialog
        open={techDialog}
        onClose={() => props.closeTechDialog()}
        submitSnack={openSnack}
      />
      <GlobalSearchDialog open={searchDialog} onClose={() => props.closeSearchDialog()}/>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={snack}
        autoHideDuration={6000}
        onClose={closeSnack}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">Report submitted!</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={closeSnack}
          >
            <CloseIcon/>
          </IconButton>
        ]}
      />
    </React.Fragment>
  );
};

export default withRouter(withStyles(styles)(withCurrentSession(AppDialogs)));

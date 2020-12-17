import WorkIcon from '@material-ui/icons/Work';
import TipsIcon from "@material-ui/icons/AttachMoney";
import AdsIcon from "@material-ui/icons/BusinessCenter";
import React, {useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import {Link, withRouter} from "react-router-dom";
import withWidth from "@material-ui/core/withWidth";
import withCurrentSession from "../withCurrentSession";
import AdvertiseDialog from "../AppDialogs/AdvertiseDialog";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTelegram, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";
import PetsIcon from "@material-ui/icons/Pets";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import ButtonBase from "@material-ui/core/ButtonBase";
import TipsDialog from "../AppDialogs/TipsDialog";
import SponsorDialog from "../AppDialogs/SponsorDialog";
import SpeciesDialog from "../AppDialogs/SpeciesDialog";
import SponsorDashboardDialog from "../AppDialogs/SponsorDashboardDialog";
import {BASIC, resolveUserType, SPONSOR, SUSPENDED, VISITOR} from "../../util/userCategory";

const BUTTON_ITEM = 0;
const LINK_ITEM = 1;
const EXTERNAL_ITEM = 2;

const styles = theme => ({
  root: {
    maxWidth: "60vw",
  },
  card: {
    backgroundColor: `rgba(0, 0, 0, 0)`,
    borderStyle: "none",
    padding: 0
  },
  cardContent: {
    padding: theme.spacing(1),
    '&:last-child': {paddingBottom: 0},
  }
});
const AppFooter = ({classes, width, currentSession, ...props}) => {
  const [sponsorDialog, setSponsorDialog] = useState(false);
  const [sponsorDashboardDialog, setSponsorDashboardDialog] = useState(false);
  const [tipsDialog, setTipsDialog] = useState(false);
  const [databaseList, setDatabaseList] = useState(false);
  const [assetDialog, setAssetDialog] = useState(false);
  const [adsDialog, setAdsDialog] = useState(false);
  const [speciesDialog, setSpeciesDialog] = useState(false);
  let userType = resolveUserType(currentSession);

  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  };
  const beginSponsorshipItem = {
    kind: BUTTON_ITEM,
    label: "Become a Sponsor!",
    icon: <PetsIcon/>,
    onClick: () => {
      if (userType === SPONSOR)
        setSponsorDashboardDialog(true);
      else if (userType !== SUSPENDED)
        setSponsorDialog(true)
    },
  };
  const advertiseItem = {
    kind: BUTTON_ITEM,
    label: "Advertise with Scritch",
    icon: <AdsIcon/>,
    onClick: () => {
      if (userType !== SUSPENDED)
        setAdsDialog(true)
    },
  };
  const tipsItem = {
    kind: BUTTON_ITEM,
    label: "Tip Jar",
    icon: <TipsIcon/>,
    onClick: () => {
      if (userType !== SUSPENDED)
        setTipsDialog(true)
    },
  };
  const workItem = {
    kind: EXTERNAL_ITEM,
    label: "Become a Developer!",
    icon: <WorkIcon/>,
    ref: (userType !== SUSPENDED) ? "" : "https://t.me/NafiTheBear"
  };
  const tosItem = {
    kind: LINK_ITEM,
    label: "Terms of Use",
    // icon: <WorkIcon/>,
    ref: `/terms_of_use`
  };
  const privPolItem = {
    kind: LINK_ITEM,
    label: "Privacy Policy",
    // icon: <WorkIcon/>,
    ref: `/privacy_policy`
  };
  const uGItem = {
    kind: LINK_ITEM,
    label: "Website User Guide",
    // icon: <WorkIcon/>,
    ref: `/user_guide`
  };
  const faqItem = {
    kind: LINK_ITEM,
    label: "FAQ",
    // icon: <WorkIcon/>,
    ref: `/faq`
  };

  const resolveItem = (itemTag) => {
    let listItemIcon = <ListItemIcon>{itemTag.icon}</ListItemIcon>;
    let listItemText = <ListItemText primary={itemTag.label}/>;
    switch (itemTag.kind) {
      case BUTTON_ITEM:
        return (
          <ListItem button onClick={itemTag.onClick}>
            {listItemIcon}
            {listItemText}
          </ListItem>
        );
      case LINK_ITEM:
        return (
          <ListItem button component={Link} to={itemTag.ref}>
            {/*{listItemIcon}*/}
            {listItemText}
          </ListItem>
        );
      case EXTERNAL_ITEM:
        return (
          <ListItem button component={ButtonBase} target="_blank" rel="noreferrer" href={itemTag.ref}>
            {listItemIcon}
            {listItemText}
          </ListItem>
        );
    }
  }

  return (
    <React.Fragment>
      <TipsDialog
        open={tipsDialog}
        onClose={() => {
          setTipsDialog(false);
          handleClose();
        }}
      />
      <SponsorDialog
        open={sponsorDialog}
        onClose={() => {
          setSponsorDialog(false);
          handleClose();
        }}
      />
      <SpeciesDialog
        open={speciesDialog}
        onClose={() => {
          setSpeciesDialog(false);
          handleClose();
        }}
      />
      <AdvertiseDialog
        open={adsDialog}
        onClose={() => {
          setAdsDialog(false);
          handleClose();
        }}
      />
      <SponsorDashboardDialog
        open={sponsorDashboardDialog}
        onClose={() => {
          setSponsorDashboardDialog(false);
          handleClose();
        }}
      />
      <Divider/>
      <Grid container direction="column" justify="flex-start" alignItems="stretch">
        <Grid container direction="row" justify="center" alignItems="flex-start">
          <Card className={classes.card} variant="outlined">
            <CardContent className={classes.cardContent}>
              <Typography component="h3"> Support Us </Typography>
              <List dense={true}>
                {resolveItem(beginSponsorshipItem)}
                {resolveItem(tipsItem)}
              </List>
            </CardContent>
          </Card>
          <Divider orientation="vertical" variant="inset"/>
          <Card className={classes.card} variant="outlined">
            <CardContent className={classes.cardContent}>
              <Typography component="h3"> Work With Us </Typography>
              <List dense={true}>
                {resolveItem(advertiseItem)}
                {resolveItem(workItem)}
              </List>
            </CardContent>
          </Card>
          <Divider orientation="vertical" variant="inset"/>
          <Card className={classes.card} variant="outlined">
            <CardContent className={classes.cardContent}>
              <Typography component="h3"> Resources & Links </Typography>
              <Grid container>
                <List dense={true}>
                  {resolveItem(tosItem)}
                  {resolveItem(privPolItem)}
                </List>
                <List dense={true}>
                  {resolveItem(uGItem)}
                  {resolveItem(faqItem)}
                </List>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Typography component="h3"> Copyright © 2020 Scritch Ltd.</Typography>
          <IconButton aria-label="Follow us on Twitter!" target="_blank" rel="noreferrer" href="https://twitter.com/PixelScritch">
            <FontAwesomeIcon icon={faTwitter}/>
          </IconButton>
          <IconButton aria-label="Get the latest News on Telegram!" target="_blank" rel="noreferrer" href="https://t.me/ScritchNews">
            <FontAwesomeIcon icon={faTelegram}/>
          </IconButton>
          <IconButton aria-label="Follow us on Youtube!" target="_blank" rel="noreferrer" href="https://www.youtube.com/channel/UC9haeD7w5jIH0q1wsLmDMmg">
            <FontAwesomeIcon icon={faYoutube}/>
          </IconButton>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default withStyles(styles)(
  withRouter(withWidth()(withCurrentSession(AppFooter)))
);

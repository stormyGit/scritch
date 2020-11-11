import WorkIcon from '@material-ui/icons/Work';
import TipsIcon from "@material-ui/icons/AttachMoney";
import AdsIcon from "@material-ui/icons/BusinessCenter";
import React, {useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import {withRouter, Link} from "react-router-dom";
import {Query} from "react-apollo";
import {GET_ADVERTS, GET_TOOLTIP} from "../../queries/advertQueries";
import uuidv4 from "uuid/v4";
import withWidth from "@material-ui/core/withWidth";
import withCurrentSession from "../withCurrentSession";
import AdvertiseDialog from "../AppDialogs/AdvertiseDialog";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTwitter, faTelegram, faYoutube} from "@fortawesome/free-brands-svg-icons";
import PetsIcon from "@material-ui/icons/Pets";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import ButtonBase from "@material-ui/core/ButtonBase";
import TipsDialog from "../AppDialogs/TipsDialog";
import SponsorDialog from "../AppDialogs/SponsorDialog";
import SpeciesDialog from "../AppDialogs/SpeciesDialog";
import AssetRequestDialog from "../AppDialogs/AssetRequestDialog";
import SponsorDashboardDialog from "../AppDialogs/SponsorDashboardDialog";

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
const AppFooter = ({classes, width, currentSession}) => {
  const [sponsorDialog, setSponsorDialog] = useState(false);
  const [sponsorDashboardDialog, setSponsorDashboardDialog] = useState(false);
  const [tipsDialog, setTipsDialog] = useState(false);
  const [databaseList, setDatabaseList] = useState(false);
  const [assetDialog, setAssetDialog] = useState(false);
  const [adsDialog, setAdsDialog] = useState(false);
  const [speciesDialog, setSpeciesDialog] = useState(false);

  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  };
  const beginSponsorshipItem = {
    label: "Become a Sponsor!",
    icon: <PetsIcon/>,
    onClick: () => setSponsorDialog(true),
  };
  const advertiseItem = {
    label: "Advertise with Scritch",
    icon: <AdsIcon/>,
    onClick: () => setAdsDialog(true),
  };
  const tipsItem = {
    label: "Tip Jar",
    icon: <TipsIcon/>,
    onClick: () => setTipsDialog(true),
  };

  const resolveItem = (itemTag) => {
    return (
      <ListItem button onClick={itemTag.onClick}>
        <ListItemIcon>
          {itemTag.icon}
        </ListItemIcon>
        <ListItemText
          primary={itemTag.label}
        />
      </ListItem>
    );
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
        <Grid container direction="row" justify="center" alignItems="flex-start" flexitem>
          <Card className={classes.card} variant="outlined" flexitem>
            <CardContent className={classes.cardContent}>
              <Typography component="h3"> Support Us </Typography>
              <List dense={true}>
                {resolveItem(beginSponsorshipItem)}
                {resolveItem(tipsItem)}
              </List>
            </CardContent>
          </Card>
          <Divider orientation="vertical" variant="inset"/>
          <Card className={classes.card} variant="outlined" flexitem>
            <CardContent className={classes.cardContent}>
              <Typography component="h3"> Work With Us </Typography>
              <List dense={true}>
                {resolveItem(advertiseItem)}
                <ListItem button component={ButtonBase} target="_blank" rel="noreferrer" href="https://t.me/NafiTheBear">
                  <ListItemIcon>
                    <WorkIcon/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Become a Developer!"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          <Divider orientation="vertical" variant="inset"/>
          <Card className={classes.card} variant="outlined" flexitem>
            <CardContent className={classes.cardContent}>
              <Typography component="h3"> Resources & Links </Typography>
              <Grid container>
                <List dense={true} flexitem>
                  <ListItem button component={Link} to={`/terms_of_use`}>
                    <ListItemText
                      primary="Terms of Use"
                    />
                  </ListItem>
                  <ListItem button component={Link} to={`/privacy_policy`}>
                    <ListItemText
                      primary="Privacy Policy"
                    />
                  </ListItem>
                </List>
                <List dense={true} flexitem>
                  <ListItem button component={Link} to={`/user_guide`}>
                    <ListItemText
                      primary="Website User Guide"
                    />
                  </ListItem>
                  <ListItem button component={Link} to={`/faq`}>
                    <ListItemText
                      primary="FAQ"
                    />
                  </ListItem>
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

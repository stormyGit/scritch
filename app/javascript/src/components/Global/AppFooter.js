import WorkIcon from '@material-ui/icons/Work';
import TipsIcon from "@material-ui/icons/AttachMoney";
import AdsIcon from "@material-ui/icons/BusinessCenter";
import React from "react";
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
    '&:last-child': { paddingBottom: 0 },
  }
});
const AppFooter = ({classes, width, currentSession}) => {
  return (
    <React.Fragment>
      <Divider/>
      <Grid container direction="column" justify="flex-start" alignItems="stretch">
        <Grid container direction="row" justify="center" alignItems="flex-start" flexItem>
          <Card className={classes.card} variant="outlined" flexItem>
            <CardContent className={classes.cardContent}>
              <Typography component="h3"> Support Us </Typography>
              <List dense={true}>
                <ListItem button href={`${process.env.SITE_URL}/sponsors/new`}>
                  <ListItemIcon>
                    <PetsIcon/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Become a Sponsor!"
                  />
                </ListItem>
                <ListItem button href={`${process.env.SITE_URL}/sponsors/new`}>
                  <ListItemIcon>
                    <TipsIcon/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Tip Us!"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
          <Divider orientation="vertical" flexItem variant="inset"/>
          <Card className={classes.card} variant="outlined" flexItem>
            <CardContent className={classes.cardContent}>
              <Typography component="h3"> Work With Us </Typography>
              <List dense={true}>
                <ListItem button href={`${process.env.SITE_URL}/sponsors/new`}>
                  <ListItemIcon>
                    <AdsIcon/>
                  </ListItemIcon>
                  <ListItemText
                    primary="Your Ads on Scritch!"
                  />
                </ListItem>
                <ListItem button href={`https://t.me/NafiTheBear`}>
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
          <Divider orientation="vertical" flexItem variant="inset"/>
          <Card className={classes.card} variant="outlined" flexItem>
            <CardContent className={classes.cardContent}>
              <Typography component="h3"> Resources & Links </Typography>
              <Grid container>
                <List dense={true} flexItem>
                  <ListItem button>
                    <ListItemText
                      primary="Terms of Use"
                    />
                  </ListItem>
                  <ListItem button>
                    <ListItemText
                      primary="Privacy Policy"
                    />
                  </ListItem>
                </List>
                <List dense={true} flexItem>
                  <ListItem button>
                    <ListItemText
                      primary="Website User Guide"
                    />
                  </ListItem>
                  <ListItem button>
                    <ListItemText
                      primary="FAQ"
                    />
                  </ListItem>
                </List>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid container flexItem direction="row" justify="center" alignItems="center">
          <Typography component="h3"> Copyright © 2020 Scritch Ltd.</Typography>
          <IconButton aria-label="Follow us on Twitter!" href="https://twitter.com/PixelScritch">
            <FontAwesomeIcon icon={faTwitter}/>
          </IconButton>
          <IconButton aria-label="Get the latest News on Telegram!" href="https://t.me/ScritchNews">
            <FontAwesomeIcon icon={faTelegram}/>
          </IconButton>
          <IconButton aria-label="Follow us on Youtube!" href="https://www.youtube.com/channel/UC9haeD7w5jIH0q1wsLmDMmg">
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

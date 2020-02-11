import React from "react";
import ReactMarkdown from "react-markdown";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import PageTitle from "../Global/PageTitle";

import faqContent from "../../faqContent";

const styles = theme => ({
  card: {
    width: "100%",
    borderRadius: 0,
    paddingBottom: theme.spacing.unit * 8
  },
  content: {
    padding: theme.spacing.unit * 4
  },
  text: {
    fontWeight: 200,
    color: theme.palette.text.primary,
    fontFamily: "Roboto"
  },
  root: {
    width: "100%",
    padding: theme.spacing.unit * 1,
    paddingRight: 0,
    paddingBottom: theme.spacing.unit * 8
  },
  gridPadder: {
    width: "100%",
    paddingLeft: theme.spacing.unit * 16,
    paddingRight: theme.spacing.unit * 16
  },
  tableRoot: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  paperQuote: {
    padding: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  link: {
    cursor: "pointer",
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  table: {
    minWidth: 700
  },
  sectionPadder: {
    marginTop: "-56px",
    paddingTop: "56px",
    display: "block"
  },
  pixelImage: {
    width: "100%"
  }
});

const Spacer = <div style={{ padding: 8 }} />;
const SpacerWithHR = (
  <React.Fragment>
    {Spacer}
    <hr />
    {Spacer}
  </React.Fragment>
);

class Faq extends React.Component {
  state = {};

  render() {
    const { classes, announcement, width } = this.props;

    return (
      <React.Fragment>
        <PageTitle>FAQ</PageTitle>
        <Grid
          container
          className={
            width !== "lg" && width !== "xl" ? classes.root : classes.gridPadder
          }
          spacing={1}
          style={{ marginTop: width === "lg" || width === "xl" ? 4 : -4 }}
        >
          <Grid item xs={12}>
            <Card className={classes.card} elevation={0}>
              <CardContent className={classes.content} className={classes.text}>
                <React.Fragment>
                  <Grid container spacing={1}>
                    <Grid item xs={12} lg={10} xl={9}>
                      <Typography variant="h2" id="website-user-guide1">
                        Scritch FAQ
                      </Typography>
                      <br />
                      <Typography variant="subtitle1">
                        Date of last revision: <strong>09 May 2019</strong>
                      </Typography>
                    </Grid>
                    {width === "xl" && <Grid item xl={1} />}
                    {(width === "xl" || width === "lg") && (
                      <Grid item lg={2}>
                        <img
                          style={{ width: "100%" }}
                          src={require("images/pixel/Header - FAQ.png")}
                        />
                      </Grid>
                    )}
                  </Grid>
                  {SpacerWithHR}
                  <ReactMarkdown
                    renderers={{
                      link: props => <a className={classes.link} {...props} />
                    }}
                    source={faqContent}
                  />
                </React.Fragment>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(Faq));

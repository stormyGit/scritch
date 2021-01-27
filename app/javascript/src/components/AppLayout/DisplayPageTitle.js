import React from "react";
import {withStyles} from "@material-ui/core/styles";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  separator: {
    height: 32,
    borderLeftColor:
      theme.palette.type === "dark"
        ? "rgba(255, 255, 255, 0.3)"
        : "rgba(0, 0, 0, 0.3)",
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    [theme.breakpoints.down("md")]: {
      borderLeftWidth: 0,
      marginLeft: 0,
      marginRight: theme.spacing(2)
    }
  },
  pageTitle: {
    marginTop: 5,
    marginBottom: 5,
    lineHeight: "36px",
    flexShrink: 0,
    maxWidth: "calc(100vw - 256px)",
    // color: theme.palette.text.primary
  }
});

const GET_PAGE_TITLE = gql`
  {
    pageTitle @client
  }
`;

function DisplayPageTitle(props) {
  const {classes} = props;

  return (
    <React.Fragment>
      <Query query={GET_PAGE_TITLE}>
        {({data}) =>
          data.pageTitle && (
            <React.Fragment>
              <Typography
                variant="h5"
                className={classes.pageTitle}
                component="div"
                noWrap
              >
                {data.pageTitle}
              </Typography>
            </React.Fragment>
          )
        }
      </Query>
    </React.Fragment>
  );
}

export default withStyles(styles)(DisplayPageTitle);

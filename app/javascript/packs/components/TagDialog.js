import React from "react";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Input from "@material-ui/core/Input";
import Select from "react-select";
import VirtualizedSelect from "react-virtualized-select";
import CheckIcon from "@material-ui/icons/Check";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import SearchBar from "material-ui-search-bar";
import TextField from "@material-ui/core/TextField";
import ScrollArea from "react-scrollbar";
import "react-virtualized-select/styles.css";
import "react-virtualized/styles.css";
import createFilterOptions from "react-select-fast-filter-options";
import { Mutation, Query } from "react-apollo";
import TelegramLoginButton from "react-telegram-login";
import { withRouter } from "react-router-dom";

import themeSelector from "../themeSelector";

import ResponsiveDialog from "./Global/ResponsiveDialog";
import EmptyList from "./Global/EmptyList";
import LoadMoreButton from "./Global/LoadMoreButton";
import Logo from "./Global/Logo";

import SignUpAlternativeDialog from "./AppDialogs/SignUpAlternativeDialog";
import FursuitMiniCard from "./Fursuits/FursuitMiniCard";
import { UPDATE_MEDIUM } from "../queries/mediaMutations";
import { LOAD_CATEGORIES } from "../queries/categoryQueries";
import { GET_MEDIA } from "../queries/mediaQueries";

import { LOAD_FURSUITS } from "../queries/fursuitQueries";

const Option = props => {
  const handleClick = event => {
    setTimeout(() => props.onSelect(props.option, event), 90);
  };

  const { children, isFocused, isSelected, onFocus, style } = props;

  const { height, ...rest } = style;

  return (
    <MenuItem
      key={props.key}
      onFocus={onFocus}
      selected={isFocused}
      onClick={handleClick}
      style={rest}
    >
      {props.option.name}
    </MenuItem>
  );
};

const styles = theme => ({
  brand: {
    textAlign: "center"
  },
  titleBarContainer: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3
  },
  link: {
    color: theme.palette.text.primary
  },
  loginButtonContainer: {
    textAlign: "center",
    marginTop: theme.spacing.unit * 2,
    position: "relative"
  },
  loginButton: {
    position: "relative",
    minHeight: 48
  },
  telegramLoader: {
    position: "absolute",
    left: "50%",
    top: 0,
    marginLeft: -16
  },
  troubleLink: {
    textAlign: "center",
    textDecoration: "underline",
    marginTop: theme.spacing.unit * 2,
    cursor: "pointer"
  },
  selectInput: {
    fontFamily: theme.typography.fontFamily
  },
  searchBar: {
    width: "100%"
  }
});

class TagDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submiting: false,
      alternativeLogin: false,
      mediaCategory: this.props.medium.category,
      fursuits: this.props.medium.fursuits,
      fursuitsCount: this.props.medium.fursuitsCount,
      query: ""
    };
  }

  isFormOk() {
    if (this.state.fursuits.length > this.state.fursuitsCount) return false;
    else if (this.state.fursuitsCount > 30) return false;
    return true;
  }

  handleSearch(val) {
    if (this.state.query.length >= 1 && val.length < 1) {
      this.reset = true;
    }

    if (this.loadEventTimer) {
      clearTimeout(this.loadEventTimer);
    }

    if (val.length >= 1) {
      this.loadEventTimer = setTimeout(() => {
        this.setState({ query: val });
      }, 500);
    } else if (this.reset) {
      clearTimeout(this.loadEventTimer);
      this.setState({ query: val });
      this.reset = false;
    }
  }

  renderResults({ data, onLoadMore, hasMore }) {
    const { classes } = this.props;

    if (data.length === 0) {
      const { location } = this.props;
      const query = queryString.parse(location.search);

      if (query.q) {
        return (
          <EmptyList
            label={`No results were found for your search term: ${query.q}`}
          />
        );
      } else {
        return <EmptyList label={`No results`} />;
      }
    }

    return (
      <React.Fragment>
        {data.fursuits.map(fursuit => (
          <Grid item xs={3} key={fursuit.id}>
            <FursuitMiniCard
              fursuit={fursuit}
              onClick={payload => {
                this.setState(prevState => ({
                  query: "",
                  fursuits: [...prevState.fursuits, payload]
                }));
              }}
            />
          </Grid>
        ))}
        {hasMore && <LoadMoreButton onClick={() => onLoadMore()} />}
      </React.Fragment>
    );
  }

  render() {
    const { classes, open, onClose, loading, width, medium } = this.props;
    let limit = parseInt(process.env.MEDIA_PAGE_SIZE);
    if (open == false) return null;

    return (
      <Mutation mutation={UPDATE_MEDIUM}>
        {(updateMedium, { called }) => {
          return (
            <React.Fragment>
              <ResponsiveDialog open={open} onClose={onClose}>
                {((width !== "lg" && width !== "xl") || true) && (
                  <DialogTitle className={classes.titleBarContainer}>
                    <Grid
                      container
                      spacing={0}
                      alignItems="center"
                      justify="space-between"
                    >
                      <Grid item>
                        <Typography variant="h6" noWrap color={"inherit"}>
                          Tag dat pic
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton
                          color="inherit"
                          onClick={onClose}
                          aria-label="Close"
                        >
                          <CloseIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </DialogTitle>
                )}
                <DialogContent>
                  <Grid container spacing={8}>
                    <Grid item xs={this.state.fursuits.length > 0 ? 9 : 12}>
                      <DialogContent>
                        <img src={`${medium.thumbnail}`} title={medium.title} />
                      </DialogContent>
                      {false && (
                        <List>
                          <ListItem>
                            <ListItemIcon>
                              <CheckIcon />
                            </ListItemIcon>
                            <ListItemText
                              inset
                              primary={`Tagging dat pic #${
                                medium.id
                              }, put dem fields here`}
                            />
                          </ListItem>
                        </List>
                      )}
                      {medium.edition && (
                        <React.Fragment>
                          <Input
                            fullWidth
                            defaultValue={medium.edition.event.name}
                            placeholder="Event"
                            disabled
                          />
                          <Input
                            fullWidth
                            defaultValue={medium.edition.name}
                            placeholder="Event"
                            disabled
                          />
                        </React.Fragment>
                      )}
                      <Query
                        query={LOAD_CATEGORIES}
                        variables={{ sort: "latest", offset: 0, limit: 150 }}
                      >
                        {({ data, loading, error, fetchMore }) => {
                          if (loading || error) {
                            return null;
                          }
                          const categoryList = [];
                          data.categories.map(e =>
                            categoryList.push({ value: e.id, label: e.name })
                          );

                          return (
                            <Select
                              fullWidth
                              placeholder="Category"
                              isSearchable
                              defaultValue={
                                medium.category
                                  ? {
                                      value: medium.category.id,
                                      label: medium.category.name
                                    }
                                  : null
                              }
                              onChange={mediaCategory => {
                                this.setState({ mediaCategory: mediaCategory });
                              }}
                              options={categoryList}
                              className={classes.selectInput}
                            />
                          );
                        }}
                      </Query>

                      <div style={{ padding: 8 }} />

                      <TextField
                        label="Number of fursuits"
                        name="fursuitsCount"
                        variant="outlined"
                        style={{ zIndex: 0 }}
                        value={this.state.fursuitsCount || ""}
                        onChange={e => {
                          this.setState({ fursuitsCount: e.target.value });
                        }}
                        margin="dense"
                        fullWidth
                      />

                      <div style={{ padding: 8 }} />

                      <InputLabel error={false}>Fursuits</InputLabel>
                      <SearchBar
                        className={classes.searchBar}
                        disabled={
                          this.state.fursuitsCount
                            ? this.state.fursuits.length >=
                              this.state.fursuitsCount
                            : true
                        }
                        onChange={value => this.handleSearch(value)}
                        value={this.state.query}
                        onCancelSearch={() => this.handleSearch("")}
                      />

                      <div style={{ padding: 8 }} />
                      {this.state.query.length >= 1 && (
                        <Query
                          query={LOAD_FURSUITS}
                          variables={{
                            name: this.state.query,
                            limit,
                            offset: 0,
                            exclude: this.state.fursuits.map(a => a.id)
                          }}
                        >
                          {({ data, loading, error, fetchMore }) => (
                            <React.Fragment>
                              <Grid
                                container
                                className={classes.root}
                                spacing={8}
                                style={{
                                  marginTop:
                                    width === "lg" || width === "xl" ? 4 : -4
                                }}
                              >
                                {!loading &&
                                  !error &&
                                  this.renderResults({
                                    data,
                                    hasMore:
                                      data.fursuits.length % limit === 0 &&
                                      this.state.hasMore &&
                                      data.fursuits.length > 0,
                                    onLoadMore: () => {
                                      fetchMore({
                                        variables: {
                                          offset: data.fursuits.length,
                                          limit
                                        },
                                        updateQuery: (
                                          prev,
                                          { fetchMoreResult }
                                        ) => {
                                          if (!fetchMoreResult) return prev;

                                          if (
                                            fetchMoreResult.fursuits.length ===
                                            0
                                          ) {
                                            this.setState({ hasMore: false });
                                          } else {
                                            return Object.assign({}, prev, {
                                              fursuits: [
                                                ...prev.fursuits,
                                                ...fetchMoreResult.fursuits
                                              ]
                                            });
                                          }
                                        }
                                      });
                                    }
                                  })}
                              </Grid>
                            </React.Fragment>
                          )}
                        </Query>
                      )}
                    </Grid>
                    {this.state.fursuits.length > 0 && (
                      <React.Fragment>
                        <Grid item lg={1} xs={1} />
                        <Grid item lg={2} xs={2}>
                          <div style={{ padding: 8 }} />
                          {this.state.fursuits.map(fursuit => (
                            <FursuitMiniCard
                              key={fursuit.id}
                              fursuit={fursuit}
                              onClick={payload => {
                                let index = this.state.fursuits.indexOf(
                                  payload
                                );
                                this.setState({
                                  fursuits: this.state.fursuits.filter(
                                    (_, i) => i !== index
                                  )
                                });
                              }}
                            />
                          ))}
                        </Grid>
                      </React.Fragment>
                    )}
                  </Grid>
                  {
                    <div className={classes.loginButtonContainer}>
                      <div className={classes.loginButton}>
                        {
                          <Button
                            disabled={!this.isFormOk()}
                            onClick={() => {
                              updateMedium({
                                variables: {
                                  input: {
                                    id: medium.id,
                                    title: medium.title,
                                    fursuitsCount: parseInt(
                                      this.state.fursuitsCount
                                    ),
                                    categoryId: this.state.mediaCategory
                                      ? this.state.mediaCategory.value
                                      : null,
                                    fursuits: this.state.fursuits.map(a => a.id)
                                  }
                                }
                              }).then(() => {
                                onClose();
                              });
                            }}
                          >
                            Submit dat shit
                          </Button>
                        }
                      </div>
                    </div>
                  }
                  {true && (
                    <Typography
                      variant="caption"
                      className={classes.troubleLink}
                      onClick={() => this.setState({ alternativeLogin: true })}
                    >
                      This is porn? Report dat shit
                    </Typography>
                  )}
                </DialogContent>
              </ResponsiveDialog>
              <SignUpAlternativeDialog
                open={this.state.alternativeLogin}
                onClose={() => {
                  this.setState({ alternativeLogin: false });
                }}
              />
            </React.Fragment>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(withRouter(withWidth()(TagDialog)));

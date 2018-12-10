import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Input from '@material-ui/core/Input';
import Select from 'react-select';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import TelegramLoginButton from 'react-telegram-login';
import { withRouter } from 'react-router-dom';

import ResponsiveDialog from './ResponsiveDialog';
import SignUpAlternativeDialog from './SignUpAlternativeDialog';
import themeSelector from '../themeSelector';

import { Mutation, Query } from "react-apollo";

import Logo from './Logo';
import { UPDATE_MEDIUM, LOAD_CATEGORIES, GET_MEDIA } from '../queries';

const styles = theme => ({
  brand: {
    textAlign: 'center',
  },
  titleBarContainer: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3
  },
  link: {
    color: theme.palette.text.primary
  },
  loginButtonContainer: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2,
    position: 'relative',
  },
  loginButton: {
    position: 'relative',
    minHeight: 48
  },
  telegramLoader: {
    position: 'absolute',
    left: '50%',
    top: 0,
    marginLeft: -16
  },
  troubleLink: {
    textAlign: 'center',
    textDecoration: 'underline',
    marginTop: theme.spacing.unit * 2,
    cursor: 'pointer',
  }
})

class TagDialog extends React.Component {
  state = {
    submiting: false,
    alternativeLogin: false,
    mediaCategory: this.props.medium.category
  }

  handleTelegramResponse(response) {
    this.setState({ submiting: true });
    this.props.onSubmit({
      telegramId: response.id,
      telegramFirstName: response.first_name,
      telegramLastName: response.last_name,
      telegramUsername: response.username,
      telegramAuthDate: response.auth_date,
      telegramPhotoUrl: response.photo_url,
      telegramHash: response.hash
    });
  }

  render() {
    const { classes, open, onClose, loading, width, medium } = this.props;

    return (
      <Mutation
        mutation={UPDATE_MEDIUM}
      >
      {
        (updateMedium, { called }) => {
          return (
            <React.Fragment>
              <ResponsiveDialog
                open={open}
                onClose={onClose}
              >
                {
                  (width !== 'lg' && width !== 'xl' || true) &&
                    <DialogTitle
                      className={classes.titleBarContainer}
                    >
                      <Grid container spacing={0} alignItems="center" justify="space-between">
                        <Grid item>
                          <Typography variant="h6" noWrap color={"inherit"}>
                            Tag da pic
                          </Typography>
                        </Grid>
                        <Grid item>
                          <IconButton color="inherit" onClick={onClose} aria-label="Close">
                            <CloseIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </DialogTitle>
                }
                <DialogContent>
                  <DialogContent>
                    <img
                      src={`${medium.thumbnail}`}
                      title={medium.title}
                    />
                  </DialogContent>
                  <List>
                    <ListItem>
                     <ListItemIcon>
                       <CheckIcon />
                     </ListItemIcon>
                     <ListItemText inset primary={`Tagging dat pic #${medium.id}, put dem fields here`} />
                    </ListItem>
                  </List>
                  {
                    medium.edition &&
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
                  }
                  <Query query={LOAD_CATEGORIES} variables={{ sort: "latest", offset: 0, limit: 150 }} fetchPolicy="network-only">
                    {({ data, loading, error, fetchMore }) => {
                      if (loading || error) {
                        return (null);
                      }
                      const categoryList = [];
                      data.categories.map((e) => categoryList.push({value: e.id, label: e.name}));

                      return(
                        <Select
                          fullWidth
                          placeholder="Category"
                          isSearchable
                          defaultValue={medium.category ? {value: medium.category.id, label: medium.category.name} : null}
                          onChange={(mediaCategory) => { this.setState({mediaCategory: mediaCategory}) }}
                          options={categoryList}
                          className={classes.selectInput}
                        />
                      );
                    }}
                  </Query>
                  {
                    <div className={classes.loginButtonContainer}>
                      <div className={classes.loginButton}>
                        {
                          <Button
                            onClick={() => {
                              console.log("here");
                              updateMedium({
                                variables: {
                                  input: {
                                    id: medium.id,
                                    title: medium.title,
                                    editionId: null,
                                    categoryId: this.state.mediaCategory.value
                                  }
                                }
                              }).then(() => {
                                onClose();
                              })
                            }}
                          >
                            Submit dat shit
                          </Button>
                        }
                      </div>
                    </div>
                  }
                  {
                    true &&
                      <Typography
                        variant="caption"
                        className={classes.troubleLink}
                        onClick={() => this.setState({ alternativeLogin: true })}
                      >
                        This is porn? Report dat shit
                      </Typography>
                  }
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
        }
      }
      </Mutation>
    );
  }
}

export default withStyles(styles)(withRouter(withWidth()(TagDialog)));

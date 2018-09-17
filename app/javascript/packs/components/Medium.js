import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import CustomAppBar from './CustomAppBar';
import SearchBar from './SearchBar';
import CardVideo from './CardVideo';
import CommentForm from './CommentForm';

const styles = theme => ({
  container: {
    margin: theme.spacing.unit * 1,
    display: 'flex'
  },
  card: {
    width: '100%',
    borderRadius: 0,
    backgroundColor: '#3F3F3F',
  },
  text: {
  },
  comment: {
    borderBottom: `1px solid rgba(255, 255, 255, 0.2)`,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
});

const GET_MEDIUM = gql`
  query Medium($id: ID!) {
    medium(id: $id) {
      id
      title
      description
      key
      user {
        id
        slug
        name
      }
      comments {
        id
        body
        user {
          id
          slug
          name
        }
      }
    }
  }
`;

class Medium extends React.Component {
  renderCommentsCount(count) {
    if (count === 0) {
      return (`No comments`);
    }
    if (count === 1) {
      return (`One comment`);
    }
    return (`${count} comments`);
  }

  render() {
    const { classes, match } = this.props;

    return (
      <React.Fragment>
        <CustomAppBar>
          <SearchBar />
        </CustomAppBar>
        <Query query={GET_MEDIUM} variables={{ id: match.params.id }}>
          {({ loading, error, data }) => {
            if (loading) {
              return (null);
            }
            return (
              <div className={classes.container}>
                <Card className={classes.card}>
                  <CardVideo medium={data.medium} />
                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h2" className={classes.text}>
                      {data.medium.title}
                    </Typography>
                    <Typography component="p" className={classes.text}>
                      {data.medium.description || 'No description'}
                    </Typography>
                  </CardContent>
                  <Grid container spacing={8}>
                    <Grid item lg={8} xs={12}>
                      <CardContent>
                        <Typography gutterBottom variant="title" component="h3">
                          {this.renderCommentsCount(data.medium.comments.length)}
                        </Typography>
                        <CommentForm mediumId={data.medium.id} initialValues={{ mediumId: data.medium.id }} />
                        {
                          data.medium.comments.map((comment) => (
                            <div key={comment.id} className={classes.comment}>
                              <Typography gutterBottom variant="body1">
                                {comment.body}
                              </Typography>
                            </div>
                          ))
                        }
                      </CardContent>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                      <CardContent>
                        <Typography gutterBottom variant="title" component="h3">
                          Related videos
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </div>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Medium);

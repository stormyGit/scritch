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
import CardHeader from '@material-ui/core/CardHeader';

import { Link} from 'react-router-dom';
import timeAgo from '../timeAgo';
import UserAvatar from './UserAvatar';

import { GET_MEDIUM } from '../queries';

import RelatedMediumCard from './RelatedMediumCard';
import CustomAppBar from './CustomAppBar';
import SearchBar from './SearchBar';
import CardVideo from './CardVideo';
import CommentForm from './CommentForm';
import FormattedText from './FormattedText';

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
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit
  },
  relatedMedia: {
    marginBottom: theme.spacing.unit
  },
  userLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  commentHeader: {
    padding: 0,
    paddingBottom: theme.spacing.unit,
  }
});

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
                  <Grid container spacing={8}>
                    <Grid item lg={8} xs={12}>
                      <CardContent>
                        <Typography gutterBottom variant="headline" component="h2" className={classes.text}>
                          {data.medium.title}
                        </Typography>
                        <Typography component="p" className={classes.text}>
                          {data.medium.description || 'No description'}
                        </Typography>
                      </CardContent>
                      <CardContent>
                        <Typography gutterBottom variant="title" component="h3">
                          {this.renderCommentsCount(data.medium.comments.length)}
                        </Typography>
                        <CommentForm mediumId={data.medium.id} initialValues={{ mediumId: data.medium.id }} />
                        {
                          data.medium.comments.map((comment) => (
                            <div key={comment.id} className={classes.comment}>
                              <CardHeader
                                className={classes.commentHeader}
                                avatar={
                                  <Link to={`/${comment.user.slug}`} className={classes.userLink}>
                                    <UserAvatar user={comment.user} />
                                  </Link>
                                }
                                title={<Link to={`/${comment.user.slug}`} className={classes.userLink}>{comment.user.name}</Link>}
                                subheader={timeAgo.format(new Date(comment.createdAt))}
                              />
                              <FormattedText text={comment.body} />
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
                        {
                          data.medium.relatedMedia.map((medium) => (
                            <div className={classes.relatedMedia} key={medium.id}>
                              <RelatedMediumCard medium={medium} horizontal/>
                            </div>
                          ))
                        }
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

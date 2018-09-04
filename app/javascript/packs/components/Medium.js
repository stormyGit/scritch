import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import CustomAppBar from './CustomAppBar';
import SearchBar from './SearchBar';

const styles = theme => ({
  container: {
    margin: theme.spacing.unit * 1,
  },
  card: {
    width: '100%',
    borderRadius: 0,
    backgroundColor: '#3F3F3F',
  },
  media: {
    height: 'calc(100vh - 128px)',
  },
  text: {
    color: theme.palette.common.white
  }
});

const GET_MEDIUM = gql`
  query Medium($id: ID!) {
    medium(id: $id) {
      id
      title
      description
    }
  }
`;

function Medium(props) {
  const { classes, medium, match } = props;

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
                <CardActionArea className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={`https://placeimg.com/640/480/${data.medium.id}`}
                    title={data.medium.title}
                  >
                  </CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h2" className={classes.text}>
                      {data.medium.title}
                    </Typography>
                    <Typography component="p" className={classes.text}>
                      {data.medium.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" className={classes.text}>
                    Share
                  </Button>
                  <Button size="small" className={classes.text}>
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </div>
          );
        }}
      </Query>
    </React.Fragment>
  );
}

export default withStyles(styles)(Medium);

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

import CustomAppBar from './CustomAppBar';
import SearchBar from './SearchBar';
import CardVideo from './CardVideo';

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
                <CardVideo medium={data.medium} />
                <CardContent>
                  <Typography gutterBottom variant="headline" component="h2" className={classes.text}>
                    {data.medium.title}
                  </Typography>
                  <Typography component="p" className={classes.text}>
                    {data.medium.description}
                  </Typography>
                </CardContent>
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

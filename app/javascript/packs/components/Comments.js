import React from 'react';
import { Query } from 'react-apollo';
import { GET_COMMENTS_BY_MEDIUM } from '../queries';
import Comment from './Comment';
import LoadMoreButton from './LoadMoreButton';

class Comments extends React.Component {
  state = {
    lastPageEmpty: false
  }

  render() {
    const { medium, parent, commentsCount } = this.props;
    let offset = 0;
    let limit = parseInt(process.env.COMMENTS_PAGE_SIZE);

    return (
      <Query
        query={GET_COMMENTS_BY_MEDIUM}
        variables={{ mediumId: medium.id, parentId: (parent ? parent.id : null), offset, limit }}
        fetchPolicy="network-only"
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading || error) {
            return (null);
          }

          return (
            <React.Fragment>
              {
                data.commentsByMedium.map((comment) => (
                  <Comment comment={comment} medium={medium} key={comment.id} disableReply={parent ? true : false} />
                ))
              }
              {
                data.commentsByMedium.length < commentsCount && data.commentsByMedium.length === 0 && !this.state.lastPageEmpty &&
                  <LoadMoreButton
                    noMargin
                    onClick={() => {
                      fetchMore({
                        variables: {
                          offset: data.commentsByMedium.length,
                          limit
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;

                          if (fetchMoreResult.commentsByMedium) {
                            this.setState({ lastPageEmpty: true });
                          }

                          return Object.assign({}, prev, {
                            commentsByMedium: [...prev.commentsByMedium, ...fetchMoreResult.commentsByMedium]
                          });
                        }
                      });
                    }}
                  />
              }
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default Comments;

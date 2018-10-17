import React from 'react';
import { Query } from 'react-apollo';
import { GET_COMMENTS_BY_MEDIUM } from '../queries';
import Comment from './Comment';
import LoadMoreButton from './LoadMoreButton';

class Comments extends React.Component {
  render() {
    const { medium, parent } = this.props;
    let page = 1;
    let per = parseInt(process.env.COMMENTS_PAGE_SIZE);

    return (
      <Query
        query={GET_COMMENTS_BY_MEDIUM}
        variables={{ mediumId: medium.id, parentId: (parent ? parent.id : null), page, per }}
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
                  <Comment comment={comment} medium={medium} key={comment.id} disableReply={true} />
                ))
              }
              {
                ((data.commentsByMedium.length % per) === 0 && data.commentsByMedium.length / per === page) &&
                  <LoadMoreButton
                    noMargin
                    onClick={() => {
                      page++;

                      fetchMore({
                        variables: {
                          page,
                          per
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;

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

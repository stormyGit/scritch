import React from 'react';
import Typography from '@material-ui/core/Typography';

function truncateText(text, limit) {
  if (text.length <= limit) {
    return (text);
  }
  return (`${text.slice(0, limit)}…`)
}

const TruncatedText = ({ children, limit }) => truncateText(children, limit)

export default TruncatedText;

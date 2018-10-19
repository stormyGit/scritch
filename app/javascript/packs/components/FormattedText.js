import React from 'react';
import Typography from '@material-ui/core/Typography';
import Linkify from 'react-linkify';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  link: {
    color: theme.palette.text.primary
  },
})

const splitParagraphs = text => text.split(/\n\n+/);
const splitLines = text => text.split(/\n+/);

const FormattedText = ({ text, variant, classes }) => {
  const paragraphs = splitParagraphs(text);

  return (
    paragraphs.map((paragraph, index) => (
      <Typography variant={variant || "body1"} paragraph={index < paragraphs.length - 1} component="div" key={index}>
        {
          splitLines(paragraph).map((line, index) => (
            <Typography variant={variant || "body1"} component="p" key={index}>
              <Linkify
                properties={{
                  className: classes.link
                }}
              >
                {line}
              </Linkify>
            </Typography>
          ))
        }
      </Typography>
    ))
  );
}

export default withStyles(styles)(FormattedText);

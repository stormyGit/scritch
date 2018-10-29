import React from 'react';
import Typography from '@material-ui/core/Typography';
import Linkify from 'react-linkify';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  link: {
    color: theme.palette.text.primary
  },
})

const splitParagraphs = text => text.split(/\n\n+/).filter((text) => !text.match(/^\s*$/));
const splitLines = text => text.split(/\n+/).filter((text) => !text.match(/^\s*$/));

const FormattedText = ({ text, variant, classes, style, className }) => {
  const paragraphs = splitParagraphs(text);

  return (
    <div style={style} className={className}>
      {
        paragraphs.map((paragraph, index) => (
          <Typography variant={variant || "body1"} paragraph={(index < paragraphs.length - 1)} component="div" key={index} style={style}>
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
      }
    </div>
  );
}

export default withStyles(styles)(FormattedText);

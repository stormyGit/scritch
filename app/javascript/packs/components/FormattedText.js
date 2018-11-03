import React from 'react';
import Typography from '@material-ui/core/Typography';
import Linkify, { linkify } from 'react-linkify';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  link: {
    color: theme.palette.text.primary
  },
})

linkify.add('@', {
  validate: function (text, pos, self) {
    var tail = text.slice(pos);

    if (!self.re.mentions) {
      self.re.mentions =  new RegExp(
        '^[a-zA-Z0-9_-]+'
      );
    }
    if (self.re.mentions.test(tail)) {
      // Linkifier allows punctuation chars before prefix,
      // but we additionally disable `@` ("@@mention" is invalid)
      if (pos >= 2 && tail[pos - 2] === '@') {
        return false;
      }
      return tail.match(self.re.mentions)[0].length;
    }
    return 0;
  },
  normalize: function (match) {
    match.url = '/' + match.url.replace(/^@/, '');
  }
});

const splitParagraphs = text => text.split(/\n\n+/).filter((text) => !text.match(/^\s*$/));
const splitLines = text => text.split(/\n+/).filter((text) => !text.match(/^\s*$/));

const FormattedText = ({ text, variant, classes, style, className, history, onChangeLocation }) => {
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
                      className: classes.link,
                      onClick: (e) => {
                        const pathname = e.target.getAttribute('href');
                        if (pathname[0] === '/') {
                          history.push({ pathname });
                          e.preventDefault();
                        }
                        if (onChangeLocation) {
                          onChangeLocation(pathname);
                        }
                      }
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

export default withStyles(styles)(withRouter(FormattedText));

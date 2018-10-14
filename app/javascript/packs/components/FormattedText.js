import React from 'react';
import Typography from '@material-ui/core/Typography';


const splitParagraphs = text => text.split(/\n\n+/);
const splitLines = text => text.split(/\n+/);

const FormattedText = ({ text, variant }) => (
  splitParagraphs(text).map((paragraph, index) => (
    <Typography variant={variant || "body1"} paragraph component="div" key={index}>
      {
        splitLines(paragraph).map((line, index) => (
          <Typography variant={variant || "body1"} component="p" key={index}>
            {line}
          </Typography>
        ))
      }
    </Typography>
  ))
)

export default FormattedText;

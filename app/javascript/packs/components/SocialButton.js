import React from "react";
import Button from '@material-ui/core/Button';
import queryString from 'query-string';

export default ({ className, name, url, params, ...props }) => (
  <Button
    className={className}
    component={(props) => (
      <a
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`Share on ${name}`}
        title={`Share on ${name}`}
        href={`${url}?${queryString.stringify(params || {})}`}
        {...props}
      />
    )}
  >
    {props.children}
  </Button>
)

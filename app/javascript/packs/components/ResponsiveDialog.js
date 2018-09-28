import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import withWidth from '@material-ui/core/withWidth';

const ResponsiveDialog = ({ width, ...props }) => (
  <Dialog
    fullScreen={width === 'md' || width === 'sm' || width === 'xs'}
    {...props}
  />
)

export default withWidth()(ResponsiveDialog);

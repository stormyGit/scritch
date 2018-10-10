import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import withWidth from '@material-ui/core/withWidth';

const ResponsiveDialog = ({ width, ...props }) => (
  <Dialog
    fullScreen={width === 'md' || width === 'sm' || width === 'xs'}
    PaperProps={{
      style: width === 'lg' || width === 'xl' ? { minWidth: 500 } : {}
    }}
    {...props}
  />
)

export default withWidth()(ResponsiveDialog);

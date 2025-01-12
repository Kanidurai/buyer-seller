import React from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import SnackBarProps from '../interfaces/snackbarProps';
import { Box, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

const SnackBar: React.FC<SnackBarProps> = ({ open, onClose, message, vertical, horizontal,customAction,severity,snackbarsize  }) => {
  const anchorOrigin: SnackbarOrigin = { vertical, horizontal };
  const backgroundColor = severity === 'success' ? '#2E7D32' : '#FBC6BB';
  const color = severity === 'success' ? 'white' : '#B00E0E';

return (
    <Snackbar
      anchorOrigin={anchorOrigin}
      open={open}
      onClose={onClose}
      message={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', color }}>
          {severity === 'success' ||
          (severity === 'error' && message?.includes('deleted')) ? (
            <CheckCircleIcon />
          ) : (
            <ErrorOutlineOutlinedIcon />
          )}
          {message}
        </Box>
      }
      action={customAction}
      sx={{
        '& .MuiSnackbarContent-root': {
          background: backgroundColor,
          color: color,
          justifyContent: 'center',
          width: 'auto',  
          padding: '8px 16px', 
        },
      }}

    />
  );
};
export default SnackBar;
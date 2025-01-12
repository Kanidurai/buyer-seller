interface SnackBarProps {
    vertical: 'top' | 'bottom'; 
    horizontal: 'left' | 'center' | 'right';
    open: boolean;
    onClose?: () => void;
    message?: string; 
    customAction?: React.ReactNode;
    severity?: 'success' | 'error';
    snackbarsize?: string;
  }
  export default SnackBarProps;
  
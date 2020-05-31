import React from 'react';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button/Button';
import Dialog from '@material-ui/core/Dialog/Dialog';
import Lottie from 'react-lottie';

const ConfirmationModal = props => {
  const {open, onClose, acceptFunction, dialogText, type} = props;

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
      aria-labelledby="max-width-dialog-title"
      style={{top: '-30%'}}
    >
      <DialogTitle><span style={{fontWeight: 'lighter', color: 'sandybrown', textTransform: 'uppercase'}}>Confirm</span></DialogTitle>
      <DialogContent style={{display: 'flex', alignItems: 'center', padding: '0 0 0 10px'}}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: type === 'confirm' ? require('../../animations/checkmark.json') : require('../../animations/remove.json'),
          }}
          height={100}
          width={100}
          style={{margin: 0, display: 'inline-block'}}
        />
        <span style={{fontWeight: 'lighter', textTransform: 'uppercase'}}>
          {dialogText}
        </span>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} style={{fontWeight: 'lighter'}}>
            No
        </Button>
        <Button onClick={acceptFunction} style={{color: 'sandybrown'}}>
            Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import { DialogActions } from '@mui/material';
import { Button } from '@mui/material';


//Components that call/use this modal should provide a title
//and an object with the information to be displayed.
//The object could contain ride details (as in the case of a new ride
//creation OR it could be a simple sentence in the case of deleting
//a ride or assigning a new driver to the ride.
function ModalDialogue(props) {
  const [open, setOpen] = useState(props.show);

  const store = useSelector((store) => store);
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
  }

  //   //loop through the object values and corresponding keys by using Object.keys & Object.values functionality
  //   for ( let i = 0; i < Object.keys(req.body).length; i++ ) {

  //     let key = Object.keys(req.body)[i];
  //     let value = Object.values(req.body)[i];

  //     //Replace single quotes in the value with two single quotes. Required or the DB will not accept the UPDATE.
  //     value = replaceApostrophe( value );

  //     // If the value is type 'string', add single quotes around it (necessary for DB update to work)
  //     if ( typeof value == 'string' ) {
  //         value = "'" + value + "'";
  //     }
  //     queryString += `${key} = ${value},`
  // }

  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>
          {/* {props.title} */}
          Testing my modal
        </DialogTitle>
        <DialogContent>
          <TextField
            disabled
            autoFocus
            margin="dense"
            id="name"
            label="name"
            type="text"
            fullWidth
            defaultValue='Jennifer'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalDialogue;

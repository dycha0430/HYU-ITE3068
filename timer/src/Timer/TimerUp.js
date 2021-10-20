import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button'

let TimerUp = ({open, handleClose}) => <div>
    <Dialog
        open={open}
        onClose={handleClose}
        //aria-labelledby="alert-dialog-title"
        //aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
            Time is up!!
        </DialogTitle>

        <DialogContent>
            <DialogContentText>
                Timer is up..
            </DialogContentText>
        </DialogContent>
        
        <DialogActions sx={{justifyContent: 'center'}}>
            <Button onClick={handleClose}>Close</Button>
        </DialogActions>
    </Dialog>
</div>

export default TimerUp
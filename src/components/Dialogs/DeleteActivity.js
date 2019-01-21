import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

class DeleteActivity extends React.Component {
  static propTypes = {
    activity: PropTypes.shape(),
    showTextInButton: PropTypes.bool,
    handleDeleteActivity: PropTypes.func
  };
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete = () => {
    this.props.handleDeleteActivity(this.props.activity.id);
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button
          aria-label="Delete Activity"
          color="primary"
          onClick={this.handleClickOpen}
        >
          <DeleteIcon fontSize="small" />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-delete-activity"
        >
          <DialogTitle id="alert-delete-activity">Delete Activity?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this activity? This operation
              cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="raised"
              onClick={this.handleDelete}
              color="primary"
              type="submit"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteActivity;

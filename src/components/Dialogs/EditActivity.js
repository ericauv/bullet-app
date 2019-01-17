import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
class EditActivity extends React.Component {
  static propTypes = {};
  state = {
    buttonText: '',
    open: false,
    nameOriginal: '',
    activity: {
      id: null,
      name: 'New Activity',
      desc: null,
      quantTarget: null,
      unit: null,
      category: null,
      dateCreated: null,
      colour: null,
      days: {}
    }
  };

  componentWillMount() {
    // const name = this.props.activity
    //   ? this.props.activity.name
    //   : 'New Activity';
    this.setState({
      activity: { ...this.props.activity },
      nameOriginal: this.props.activity
        ? this.props.activity.name
        : 'New Activity'
    });
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false, buttonText: this.props.buttonText });
  };

  handleChange = name => ({ currentTarget: { value } }) => {
    // 1. Make a copy of the activity in state
    const activity = { ...this.state.activity };
    // 2. Update the value of the activity
    activity[name] = value;
    // 3. Update the state
    this.setState({ activity });
  };

  handleSubmit = () => {
    // TODO: validate

    const activity = this.state.activity.id
      ? // Make a copy of the activity if it was passed
        { ...this.state.activity }
      : // Initialize required properties of activity if this is a new activity
        this.initializeNewActivity({ ...this.state.activity });
    // Pass activity to App
    this.props.handleActivitySubmit(activity);
    this.setState({
      // Close the Dialog
      open: false,
      // Update the button text if this is not an "Add Activity" button
      buttonText: this.state.isAddActivity
        ? 'Add Activity'
        : this.state.activity.name
    });
  };

  initializeNewActivity(activity) {
    activity.id = Date.now();
    activity.name = activity.name || 'New Activity';
    activity.quantTarget = activity.quantTarget || 1;
    activity.colour = activity.colour || '0,0,0';
    activity.dateCreated = new Date().toDateString();
    activity.days = {
      [activity.dateCreated]: {
        notes: '',
        quantFilled: 0
      }
    };
    return activity;
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen}>
          {this.props.activity ? this.props.activity.name : 'Add Activity'}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-add-activity"
        >
          <DialogTitle id="form-add-activity">
            {// If the user clears the input field, display the original Activity Name
            this.state.activity.name || this.state.nameOriginal}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Activity Name"
              autoFocus
              margin="dense"
              type="text"
              fullWidth
              onChange={this.handleChange('name')}
            />
            <TextField
              label="Target"
              margin="dense"
              type="number"
              fullWidth
              onChange={this.handleChange('quantTarget')}
            />
            <TextField
              label="Unit"
              margin="dense"
              type="text"
              fullWidth
              onChange={this.handleChange('unit')}
            />
            <TextField
              label="Category"
              margin="dense"
              placeholder="No Category"
              type="text"
              fullWidth
              onChange={this.handleChange('category')}
            />
            <TextField
              id="activity-description"
              margin="dense"
              placeholder="Enter a description of your activity (not required)"
              label="Description"
              type="text"
              multiline
              rows="3"
              min="0"
              fullWidth
              onChange={this.handleChange('description')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              variant="raised"
              onClick={this.handleSubmit}
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default EditActivity;

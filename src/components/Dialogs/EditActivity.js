import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
class EditActivity extends React.Component {
  state = {
    open: false,
    nameOriginal: '',
    activity: {
      id: null,
      name: 'New Activity',
      desc: '',
      quantTarget: 0,
      unit: '',
      category: '',
      dateCreated: null,
      colour: '',
      days: {}
    },
    activityValidator: {
      nameIsValid: true,
      quantTargetIsValid: true,
      unitIsValid: true,
      categoryIsValid: true
      // colourIsValid: true
    }
  };

  static propTypes = {
    isAddActivity: PropTypes.bool
  };

  componentWillMount() {
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
    this.setState({ open: false });
  };

  handleChange = name => ({ currentTarget: { value } }) => {
    // 1. Make a copy of the activity in state
    const activity = { ...this.state.activity };
    // 2. Update the value of the activity
    activity[name] = value;
    // 3. Update the state
    this.setState({ activity });
  };

  validateActivityInput = activity => {
    const activityValidator = {
      nameIsValid: false,
      quantTargetIsValid: false,
      unitIsValid: false,
      categoryIsValid: false
      // colourIsValid: false
    };
    // Regular expression to check for valid hex colour
    // const hexColourRegExp = \^#(?:[0-9a-fA-F]{3}){1,2}$\;
    /* VALIDATION */

    //TODO: pass categories as prop
    const categories = ['test1', 'test2'];
    // Name length is acceptable (0-20 characters)
    activityValidator.nameIsValid =
      activity.name && activity.name.length > 0 && activity.name.length < 20;
    // Unit length is acceptable (0-20 characters)
    activityValidator.unitIsValid =
      activity.unit && activity.unit.length > 0 && activity.unit.length < 20;
    // Category is one of the acceptable categories
    activityValidator.categoryIsValid =
      activity.category && categories.includes(activity.category);
    // Target is non-negative and non-zero
    activityValidator.quantTargetIsValid =
      activity.quantTarget && activity.quantTarget > 0;
    // TODO: // Colour is a valid hex color
    // activityValidator.colourIsValid = hexColourRegExp.test(activity.colour) ;

    this.setState({ activityValidator });
    return activityValidator;
  };
  messageInvalidInput = () => {
    // TODO: Indicate invalid properties
    alert('input was invalid');
  };
  handleSubmit = e => {
    // Prevent form submission
    e.preventDefault();
    // Validate the input
    const activityValidator = this.validateActivityInput({
      ...this.state.activity
    });
    // Don't submit if all the inputs were not valid
    if (!Object.values(activityValidator).every(val => val === true)) {
      alert('input was invalid');
      return null;
    }
    const activity = this.state.activity.id
      ? // Make a copy of the activity if it was passed
        { ...this.state.activity }
      : // Initialize required properties of activity if this is a new activity
        this.initializeNewActivity({ ...this.state.activity });
    // Pass activity to App
    this.props.handleActivitySubmit(activity);
    this.setState({
      // Close the Dialog
      open: false
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
    const buttonIcon = this.props.isAddActivity ? (
      <AddIcon fontSize="small" />
    ) : (
      <EditIcon fontSize="small" />
    );
    const buttonLabel = this.props.isAddActivity
      ? 'Add Activity'
      : 'Edit Activity';
    const { name, quantTarget, unit, category, description } = this.props
      .activity
      ? { ...this.props.activity }
      : '';
    const { nameIsValid, quantTargetIsValid, unitIsValid, categoryIsValid } = {
      ...this.state.activityValidator
    };
    return (
      <div>
        <Button
          aria-label={buttonLabel}
          color="primary"
          onClick={this.handleClickOpen}
        >
          {buttonIcon}
          {this.props.isAddActivity ? 'Add Activity' : null}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-edit-activity"
        >
          <DialogTitle id="form-edit-activity">
            {// If the user clears the input field, display the original Activity Name
            this.state.activity.name || this.state.nameOriginal}
          </DialogTitle>
          <form>
            <DialogContent>
              <TextField
                label="Activity Name"
                autoFocus
                margin="dense"
                type="text"
                fullWidth
                onChange={this.handleChange('name')}
                defaultValue={name}
                error={!nameIsValid}
                required={true}
                helperText="Must be between 1-20 characters"
              />
              <TextField
                label="Target"
                margin="dense"
                type="number"
                inputProps={{ min: '0' }}
                fullWidth
                onChange={this.handleChange('quantTarget')}
                defaultValue={quantTarget}
                error={!quantTargetIsValid}
                required={true}
                helperText="Must be greater than 0"
              />
              <TextField
                label="Unit"
                margin="dense"
                type="text"
                fullWidth
                onChange={this.handleChange('unit')}
                defaultValue={unit}
                error={!unitIsValid}
                required={true}
                helperText="Must be between 1-20 characters"
              />
              <TextField
                label="Category"
                margin="dense"
                placeholder="No Category"
                type="text"
                fullWidth
                onChange={this.handleChange('category')}
                defaultValue={category}
                error={!categoryIsValid}
                required={true}
                helperText="Must be one of the values provided in the drop-down"
              />
              <TextField
                id="activity-description"
                margin="dense"
                placeholder="Enter a description of your activity (not required)"
                label="Description"
                type="text"
                multiline
                rows="3"
                fullWidth
                onChange={this.handleChange('description')}
                defaultValue={description}
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
          </form>
        </Dialog>
      </div>
    );
  }
}

export default EditActivity;

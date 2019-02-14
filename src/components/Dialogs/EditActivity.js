import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import ColourPicker from '../ColourPicker';

class EditActivity extends React.Component {
  state = {
    open: false,
    nameOriginal: '',
    activity: {
      id: null,
      name: '',
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
    activity: PropTypes.shape(),
    isAddActivity: PropTypes.bool,
    categories: PropTypes.arrayOf(PropTypes.string),
    handleActivitySubmit: PropTypes.func,
    fab: PropTypes.bool
  };

  componentWillMount() {
    this.setState({
      activity: this.props.activity
        ? { ...this.props.activity }
        : { category: '' },
      nameOriginal: this.props.activity
        ? this.props.activity.name
        : 'New Activity'
    });
  }
  handleClickOpen = () => {
    this.setState({
      open: true,
      activity: this.props.activity
        ? { ...this.props.activity }
        : { category: '' },
      nameOriginal: this.props.activity
        ? this.props.activity.name
        : 'New Activity'
    });
    // Make all inputs valid until changed by user (validity is updated on change)
    this.resetValidator();
  };
  handleClose = () => {
    // Close the dialog
    this.setState({ open: false });
    // Reset state so that next time dialog opens it takes passed props or is empty
    this.setState({ activity: { category: '' } });
    // Reset the activity validator so that inputs are all in non-error state next time dialog opens
    this.resetValidator();
  };

  resetValidator = () => {
    // Used to reset validator so that when dialog is opened all inputs are in valid state
    const activityValidator = { ...this.state.activityValidator };
    Object.keys(this.state.activityValidator).map(key => {
      activityValidator[key] = true;
      return null;
    });
    this.setState({ activityValidator });
  };

  handleChange = name => ({ target: { value } }) => {
    // 1. Make a copy of the activity in state
    const activity = { ...this.state.activity };
    // 2. Update the value of the activity
    activity[name] = value;
    // 3. Update the activity, and validate the input
    this.setState({ activity }, () =>
      this.validateActivityInput({ ...this.state.activity })
    );
  };

  handleColourChange = colour => {
    // 1. Make a copy of the activity in state
    const activity = { ...this.state.activity };
    // 2. Update the value of the activity
    activity.colour = colour;
    // 3. Update the activity, and validate the input
    this.setState({ activity }, () =>
      this.validateActivityInput({ ...this.state.activity })
    );
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

    // Name length is acceptable (0-20 characters)
    activityValidator.nameIsValid =
      activity.name && activity.name.length > 0 && activity.name.length < 20;
    // Unit length is acceptable (0-20 characters)
    activityValidator.unitIsValid =
      activity.unit && activity.unit.length > 0 && activity.unit.length < 20;
    // Category is one of the acceptable categories
    activityValidator.categoryIsValid =
      activity.category && this.props.categories.includes(activity.category);
    // Target is non-negative and non-zero
    activityValidator.quantTargetIsValid =
      activity.quantTarget && activity.quantTarget > 0;
    // TODO: // Colour is a valid hex color
    // activityValidator.colourIsValid = hexColourRegExp.test(activity.colour) ;

    this.setState({ activityValidator });
    return activityValidator;
  };
  messageInvalidInput = () => {
    // TODO: Render a dialog
    alert('The input was invalid.');
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
      this.messageInvalidInput();
      return null;
    }
    const activity = this.state.activity.id
      ? // Make a copy of the activity if it was passed
        { ...this.state.activity }
      : // Initialize required properties of activity if this is a new activity
        this.initializeNewActivity({ ...this.state.activity });
    // Pass activity to App
    this.props.handleActivitySubmit(activity);
    // Close the dialog
    this.handleClose();
  };

  initializeNewActivity(activity) {
    activity.id = Date.now();
    activity.name = activity.name || 'New Activity';
    activity.quantTarget = activity.quantTarget || 1;
    activity.category = activity.category || 'No Category';
    activity.colour = activity.colour || this.props.colours.red;
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
      this.props.fab ? (
        <Fab color="primary" aria-label="Add">
          <AddIcon />
        </Fab>
      ) : (
        <AddIcon fontSize="small" />
      )
    ) : (
      <EditIcon fontSize="small" />
    );
    const buttonLabel = this.props.isAddActivity
      ? this.props.fab
        ? null
        : 'Add Activity'
      : 'Edit Activity';
    const { name, quantTarget, unit, desc } = this.props.activity
      ? { ...this.props.activity }
      : '';
    const { nameIsValid, quantTargetIsValid, unitIsValid, categoryIsValid } = {
      ...this.state.activityValidator
    };
    const buttonStyle = {
      minWidth: '20px',
      minHeight: '20px'
    };

    return (
      <div>
        <Button
          aria-label={buttonLabel}
          color="primary"
          onClick={this.handleClickOpen}
          style={buttonStyle}
        >
          {buttonIcon}
          {buttonLabel}
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
              {/*Name*/}
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
              {/*Target*/}
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
              {/*Unit*/}
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
              {/*Category*/}
              <FormControl
                margin="dense"
                required
                fullWidth
                error={!categoryIsValid}
              >
                <InputLabel htmlFor="category-required">Category</InputLabel>
                <Select
                  input={
                    <Input
                      type="text"
                      name="category"
                      id="category"
                      placeholder="Select a Category"
                      onChange={this.handleChange('category')}
                    />
                  }
                  value={this.state.activity.category}
                  name="category"
                  inputProps={{
                    id: 'category-native-required'
                  }}
                >
                  <MenuItem value="No Category">
                    <em>Select a Category</em>
                  </MenuItem>
                  {this.props.categories.map((currentCategory, i) => {
                    return (
                      <MenuItem key={i} value={currentCategory}>
                        {currentCategory}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </FormControl>
              {/*Description*/}
              <TextField
                id="activity-description"
                margin="dense"
                placeholder="Enter a description of your activity (not required)"
                label="Description"
                type="text"
                multiline
                rows="3"
                fullWidth
                onChange={this.handleChange('desc')}
                defaultValue={desc}
              />
              <ColourPicker
                handleColourChange={this.handleColourChange}
                colours={this.props.colours}
                checkedColour={
                  this.props.activity ? this.props.activity.colour : null
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button
                variant="contained"
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

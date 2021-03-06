import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

class InputDay extends React.Component {
  state = {
    open: false,
    notes: '',
    quantFilled: 0,
    quantFilledIsValid: true,
    notesIsValid: true
  };

  static propTypes = {
    open: PropTypes.bool,
    activity: PropTypes.shape(),
    quantFilled: PropTypes.number,
    quantTarget: PropTypes.number,
    unit: PropTypes.string,
    notes: PropTypes.string,
    activityId: PropTypes.number,
    activityName: PropTypes.string,
    dayId: PropTypes.string,
    updateDay: PropTypes.func,
    handleCloseDialog: PropTypes.func
  };

  componentWillMount() {
    this.setState({
      quantFilled: this.props.quantFilled || 0,
      notes: this.props.notes || '',
      notesIsValid: true,
      quantFilledIsValid: true
    });
  }

  componentDidUpdate() {
    // TODO fix bug
    const opening = () =>
      this.state.open === true
        ? this.setState({
            notes: this.props.notes || '',
            quantFilled: this.props.quantFilled || 0
          })
        : null;
  }

  validateDayInput = () => {
    const quantFilledIsValid =
      parseFloat(this.state.quantFilled) <= parseFloat(this.props.quantTarget);

    const notesIsValid = this.state.notes.length < 1000;

    this.setState({ quantFilledIsValid, notesIsValid });
  };
  handleClose = () => {
    this.props.handleCloseDialog();
    this.setState({
      open: false,
      notesIsValid: true,
      quantFilledIsValid: true
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // Alert and don't update day or close form if the input wasn't valid
    if (!(this.state.notesIsValid && this.state.quantFilledIsValid)) {
      alert('Invalid Input');
      return;
    }
    // Update the day
    this.props.updateDay(
      this.props.activityId,
      this.props.dayId,
      this.state.quantFilled,
      this.state.notes
    );
    // Close the form
    this.handleClose();
  };
  handleChange = name => ({ target: { value } }) => {
    let newValue = value;
    // Format quantFilled value to a number
    if (name === 'quantFilled') {
      newValue = parseFloat(newValue);
    }
    this.setState({ [name]: newValue }, () =>
      this.validateDayInput({ ...this.state })
    );
  };

  render() {
    return (
      <Dialog
        open={this.props.open || this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-edit-activity"
      >
        <DialogTitle id="form-input-day">
          {`${this.props.activityName} - ${this.props.dayId}`}
        </DialogTitle>
        <form>
          <DialogContent>
            <TextField
              label={`${this.props.unit}s Completed / ${
                this.props.quantTarget
              }`}
              margin="dense"
              type="number"
              autoFocus
              inputProps={{ min: '0', max: `${this.props.quantTarget}` }}
              fullWidth
              onChange={this.handleChange('quantFilled')}
              value={this.state.quantFilled}
              error={!this.state.quantFilledIsValid}
              required={true}
              helperText={`Enter the number of ${
                this.props.unit
              }s you completed on this day`}
            />
            <TextField
              label="Notes"
              multiline
              rows="2"
              margin="dense"
              type="text"
              fullWidth
              onChange={this.handleChange('notes')}
              value={this.state.notes}
              error={!this.state.notesIsValid}
              required={true}
              helperText="Must be less than 1000 characters"
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
    );
  }
}
export default InputDay;

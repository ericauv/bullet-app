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
    quantFilled: PropTypes.number,
    quantTarget: PropTypes.number,
    unit: PropTypes.string,
    notes: PropTypes.string,
    activityId: PropTypes.string,
    activityName: PropTypes.string,
    date: PropTypes.string,
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

  handleSubmit = () => {
    // Alert and don't update day or close form if the input wasn't valid
    if (!(this.state.notesIsValid && this.state.quantFilledIsValid)) {
      alert('Invalid Input');
      return;
    }
    // Update the day
    this.props.updateDay(
      this.props.activityId,
      this.props.date,
      this.state.quantFilled,
      this.state.notes
    );
    // Close the form
    this.handleClose();
  };
  handleChange = name => ({ target: { value } }) => {
    // 3. Update the state, and validate the input
    this.setState({ [name]: value }, () =>
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
          {`${this.props.activityName} - ${this.props.date}`}
        </DialogTitle>
        <DialogContent>
          <TextField
            label={`${this.props.unit}s Completed / ${this.props.quantTarget}`}
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
            defaultValue={this.state.notes}
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
      </Dialog>
    );
  }
}
export default InputDay;

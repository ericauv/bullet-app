import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class AddActivityForm extends React.Component {
  nameRef = React.createRef();
  quantTargetRef = React.createRef();
  unitRef = React.createRef();
  categoryRef = React.createRef();
  descRef = React.createRef();
  colourRef = React.createRef();

  static propTypes = {
    addActivity: PropTypes.func,
    units: PropTypes.arrayOf(PropTypes.string)
  };

  createActivity = event => {
    // 1. Stop form from submitting
    event.preventDefault();
    // 2. Make id for new activity
    const id = Date.now();
    // 3. Create new activity
    const activity = {
      id: id,
      dateCreated: new Date(id).toDateString(),
      name: this.nameRef.current.value || 'New Activity',
      quantTarget: this.quantTargetRef.current.value || 1,
      unit: this.unitRef.current.value || 'Units',
      category: this.categoryRef.current.value || 'No Category',
      desc: this.descRef.current.value || 'No Description',
      colour: this.colourRef.current.value || '0,0,0',
      days: {
        [new Date(id).toDateString()]: {
          quantFilled: 0,
          notes: ''
        }
      }
    };
    // 4. Add activity to state
    this.props.addActivity(activity);
  };

  render() {
    return (
      <form className="add-activity" onSubmit={this.createActivity}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
        <input
          name="quantTarget"
          ref={this.quantTargetRef}
          type="number"
          placeholder="Target Quantity"
        />
        <input name="unit" ref={this.unitRef} type="text" placeholder="Unit" />
        <input
          name="category"
          ref={this.categoryRef}
          type="text"
          placeholder="Category"
        />
        <input
          name="desc"
          ref={this.descRef}
          type="text"
          placeholder="Description"
        />
        <input
          name="colour"
          ref={this.colourRef}
          type="text"
          placeholder="Colour"
        />
        <button type="submit">+ Add Activity</button>
      </form>
    );
  }
}

export default AddActivityForm;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class ColourPickerRadioButton extends React.Component {
  static PropTypes = {
    colour: PropTypes.string,
    isChecked: PropTypes.bool,
    handleCheck: PropTypes.func,
    functional: PropTypes.bool
  };

  handleRadioCheck = () => {
    if (this.props.functional) {
      this.props.handleCheck(this.props.colour);
    }
  };
  render() {
    const CheckmarkDiv = styled.div`
      width: 20px;
      height: 20px;
      background-color: ${`rgb(${this.props.colour})`};
      border-radius: 50%;
      ${this.props.functional && this.props.isChecked
        ? `transform:scale(1.15); border:0.5px solid black; box-shadow:-1px -1px rgba(0,0,0,0.5), 1px -1px rgba(0,0,0,0.5), -1px 1px rgba(0,0,0,0.5), 1px 1px rgba(0,0,0,0.5);`
        : null}
      ${this.props.functional
        ? `&:hover {
        cursor: pointer;
        transform: scale(1.15);
        transition: 0.2s;
      }`
        : null}
    `;
    return (
      <CheckmarkDiv
        checked={this.props.functional ? this.props.isChecked : null}
        onClick={this.handleRadioCheck}
      />
    );
  }
}

export default ColourPickerRadioButton;

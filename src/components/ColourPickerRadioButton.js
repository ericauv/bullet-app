import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class ColourPickerRadioButton extends React.Component {
  static PropTypes = {
    colour: PropTypes.string,
    isChecked: PropTypes.bool,
    handleCheck: PropTypes.func
  };

  handleRadioCheck = () => {
    this.props.handleCheck(this.props.colour);
  };
  render() {
    const CheckmarkDiv = styled.div`
      width: 20px;
      height: 20px;
      background-color: ${`rgb(${this.props.colour})`};
      border-radius: 50%;
      ${this.props.isChecked
        ? `border:1px solid black; box-shadow:-1px -1px rgba(0,0,0,0.5);`
        : null}
      &:hover {
        cursor: pointer;
        transform: scale(1.15);
        transition: 0.2s;
      }
    `;
    return (
      <CheckmarkDiv
        checked={this.props.isChecked}
        onClick={this.handleRadioCheck}
      />
    );
  }
}

export default ColourPickerRadioButton;

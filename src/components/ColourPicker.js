import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ColourPickerRadioButton from './ColourPickerRadioButton';

const PickerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20px, 1fr));
  grid-gap: 10px;
  width: 100%;
  padding-top: 20px;
`;

class ColourPicker extends React.Component {
  state = {
    checkedColour: null
  };

  static propTypes = {
    colours: PropTypes.arrayOf(PropTypes.string),
    checkedColour: PropTypes.string,
    handleColourChange: PropTypes.func
  };

  handleCheck = colour => {
    this.setState({ checkedColour: colour });
    this.props.handleColourChange(colour);
  };

  render() {
    return (
      <PickerGrid>
        {Object.values(this.props.colours).map((colour, i) => {
          return (
            <ColourPickerRadioButton
              isChecked={this.state.checkedColour === colour}
              key={i}
              colour={colour}
              handleCheck={this.handleCheck}
            />
          );
        })}
      </PickerGrid>
    );
  }
}

export default ColourPicker;

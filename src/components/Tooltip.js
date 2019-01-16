import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
class Tooltip extends React.Component {
  static propTypes = {
    show: PropTypes.bool,
    text: PropTypes.string
  };

  styleTooltip() {
    const styledTooltipTag = styled.div`
      background-color: rgba(0, 0, 0, 0.2);
      color: rgba(20, 20, 20, 0.85);
      z-index: 2;
      position: absolute;
    `;
    return styledTooltipTag;
  }

  render() {
    const ToolTipTag = this.styleTooltip();
    // Render Tooltip if .show was true || Render nothing if .show was false
    return this.props.show ? <ToolTipTag>{this.props.text}</ToolTipTag> : null;
  }
}
export default Tooltip;

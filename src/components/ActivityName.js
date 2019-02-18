import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import EditActivity from './Dialogs/EditActivity';
import DeleteActivity from './Dialogs/DeleteActivity';

class ActivityName extends React.Component {
  static propTypes = {
    activity: PropTypes.shape(),
    categories: PropTypes.arrayOf(PropTypes.string),
    colours: PropTypes.shape(),
    handleActivitySubmit: PropTypes.func,
    handleDeleteActivity: PropTypes.func
  };
  render() {
    const ActivityNameTag = styled.div`
      display: grid;
      background-color: rgb(${this.props.activity.colour});
      background-size: 10%;
      ${this.props.activity.colour === this.props.colours.black
        ? `color:white;`
        : null}
      border-radius: 2px 2px 2px 2px;
      @media only screen and (min-width: 1101px) {
        padding-left: 5px;
        padding-right: 5px;
        margin-right: 5px;
        grid-template-columns: minmax(90px, 3fr) 1fr 1fr;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        max-width: 100%;
      }
      @media only screen and (max-width: 1100px) {
        padding-top: 5px;
        padding-bottom: 5px;
        margin-bottom: 5px;
        writing-mode: vertical-lr;
        grid-template-columns: minmax(90px, 3fr) 1fr 1fr;
        align-items: center;
        justify-items: start;
      }
    `;
    return (
      <ActivityNameTag>
        <span>{this.props.activity.name}</span>
        <EditActivity
          activity={this.props.activity}
          categories={this.props.categories}
          handleActivitySubmit={this.props.handleActivitySubmit}
          isAddActivity={false}
          style={{ maxWidth: '100%' }}
          colours={this.props.colours}
        />
        <DeleteActivity
          activity={this.props.activity}
          categories={this.props.categories}
          showTextInButton={false}
          handleDeleteActivity={this.props.handleDeleteActivity}
        />
      </ActivityNameTag>
    );
  }
}

export default ActivityName;

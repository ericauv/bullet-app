import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ColorPickerRadioButton from './ColourPickerRadioButton';
import EditActivity from './Dialogs/EditActivity';
import DeleteActivity from './Dialogs/DeleteActivity';

class ManageActivities extends React.Component {
  static propTypes = {
    activities: PropTypes.shape(),
    categories: PropTypes.shape()
  };

  render() {
    const activities = { ...this.props.activities };
    const categories = { ...this.props.categories };
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Colour</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Target</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(activities).map(activity => {
            return (
              <TableRow
                id={activity.id}
                style={{ backgroundColor: `rgba(${activity.colour},0.2)` }}
              >
                <TableCell>
                  <ColorPickerRadioButton colour={activity.colour} />
                </TableCell>
                <TableCell>{activity.name}</TableCell>
                <TableCell>{activity.category}</TableCell>
                <TableCell>{activity.desc}</TableCell>
                <TableCell>{activity.unit}</TableCell>
                <TableCell>{activity.quantTarget}</TableCell>
                <TableCell>{activity.dateCreated}</TableCell>
                <TableCell /* Actions */>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '20px 20px',
                      gridGap: '20px'
                    }}
                  >
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
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}
export default ManageActivities;

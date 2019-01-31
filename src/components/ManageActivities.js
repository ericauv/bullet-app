import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
class ManageActivities extends React.Component {
  static propTypes = {
    activities: PropTypes.shape()
  };

  render() {
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
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.values(this.props.activities).map(activity => {
            return (
              <TableRow id={activity.id}>
                <TableCell>{activity.colour}</TableCell>
                <TableCell>{activity.name}</TableCell>
                <TableCell>{activity.category}</TableCell>
                <TableCell>{activity.desc}</TableCell>
                <TableCell>{activity.unit}</TableCell>
                <TableCell>{activity.quantTarget}</TableCell>
                <TableCell>
                  <Button>Test</Button>
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

import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';

import config from '../../../sharedFiles/Config.jsx';

// ---------------------------------------------------------------------------
// Renders each room type info
class RoomTypeInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.display = true;
  }

  // ---------------------------------------------------------------------------
  // Deletes a room type according to the component props id
  deleteRoomType(roomTypeID) {
    // get user id and token
    const userID = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');
    const propertyID = this.props.propertyID;

    axios({

      method: 'delete',
      url: config.dashboardAPI + '/user/' + userID + '/properties/' +
      propertyID + '/roomTypes/' + roomTypeID,
      headers: config.headers(token)

    }).then((response) => {

      if (response.data.error === 'noErrors') {

        $.notify(response.data.message, 'success');
        this.setState({display: false});

      } else $.notify(response.data.message, 'error');
    })
  }

  // ---------------------------------------------------------------------------
  // renders html
  render() {
    const { roomType, propertyID } = this.props;

    if (this.state.display === false) return null
    else return (
      <tr>
        <td>{roomType.id}</td>

        <td>{roomType.name}</td>

        <td>{roomType.totalRooms}</td>

        <td>{roomType.maxPax}</td>

        <td>
          <Link to={'dashboard/properties/' + propertyID +
          '/roomTypes/' + roomType.id + '/rates'}
          className="btn btn-default"> Rates </Link>

          <Link to={'dashboard/properties/' + propertyID +
          '/roomTypes/' + roomType.id + '/amenities'}
          className="btn btn-default"> Room Type Amenities </Link>

          <Link to={'dashboard/properties/' + propertyID +
          '/roomTypes/' + roomType.id + '/images'}
          className="btn btn-default"> Images </Link>
        </td>

        <td>
          <Link to={'dashboard/properties/' + propertyID + '/roomTypes/' + roomType.id}
          className="btn btn-default custom-btn-green"> Edit </Link>

          <a onClick={() => this.deleteRoomType(roomType.id)}
          className="btn btn-default custom-btn-red"> Delete </a>
        </td>
      </tr>
    )
  }

}

export default RoomTypeInfo

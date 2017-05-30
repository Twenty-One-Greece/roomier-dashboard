import React from 'react';
import axios from 'axios';
import Alert from 'react-s-alert';

import config from '../../../sharedFiles/Config.jsx';

class AvailableAmenity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.addAmenity = this.addAmenity.bind(this);
  }

  // ---------------------------------------------------------------------------
  // sends the amenity to the server to be added to the db
  addAmenity() {
    const userID = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');
    const propertyID = this.props.propertyID;

    const data = {
      "userID": userID,
      "name": this.props.amenity,
      "price": 0,
      "type": 1,
      "propertyID": propertyID
    }

    axios({

      method: 'post',
      url: config.dashboardAPI + '/user/' + userID + '/properties/' +
      propertyID + '/amenities/new',
      data: data,
      headers: config.headers(token)

    })
    .then((response) => this.props.handleResponse(response))
    .catch((error) => $.notify(error, 'error'));
  }

  // ---------------------------------------------------------------------------
  // renders html
  render() {
    const { amenity } = this.props
    return (
        <button type="button" onClick={this.addAmenity}
        className="btn btn-default btn-xs">{amenity}</button>
    )
  }

}

export default AvailableAmenity

import React from 'react';
import axios from 'axios';

import config from '../../../sharedFiles/Config.jsx';


// -----------------------------------------------
// Renders each property info
class AvailableService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.addService = this.addService.bind(this);
  }

  // -----------------------------------------------
  // sends the service to the server to be added to the db
  addService() {
    // get user id and token
    const userID = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');
    const propertyID = this.props.propertyID;

    const data = {
      "userID": userID,
      "name": this.props.service,
      "price": 0,
      "propertyID": propertyID
    }

    axios({

      method: 'post',
      url: config.dashboardAPI + '/user/' + userID + '/properties/' +
      propertyID + '/services/new',
      data: data,
      headers: config.headers(token)

    }).then((response) => this.props.handleResponse(response))
    .catch((error) => $.notify(response.data.message, 'error'));
  }

  // -----------------------------------------------
  // renders html
  render() {
    const { service } = this.props
    return (
      <button type="button" onClick={this.addService}
      className="btn btn-default btn-xs">{service}</button>
    )
  }

}

export default AvailableService

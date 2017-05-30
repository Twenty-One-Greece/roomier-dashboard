import React from 'react';
import axios from 'axios';
import Alert from 'react-s-alert';

import config from '../../../sharedFiles/Config.jsx';


// -----------------------------------------------
// Renders each property info
class SelectedService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.removeService = this.removeService.bind(this);
  }

  // -----------------------------------------------
  // sends the service to the server to be added to the db
  removeService() {
    // get user id and token
    const userID = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');
    const propertyID = this.props.propertyID;
    const serviceID = this.props.service.id;

    axios({

      method: 'delete',
      url: config.dashboardAPI + '/user/' + userID + '/properties/' +
      propertyID + '/services/' + serviceID,
      headers: config.headers(token)

    }).then((response) => this.props.handleResponse(response))

    .catch((error) => $.notify(error, 'error'));
  }

  // -----------------------------------------------
  // renders html
  render() {
    const { service } = this.props
    return (
      <div className="policy">
        <button type="button" className="close">
          <span className="x-btn" onClick={this.removeService}>×</span>
        </button>
        <p>{service.name} {service.price}</p>
      </div>
    )
  }

}

export default SelectedService

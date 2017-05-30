import React from 'react';
import axios from 'axios';
import Alert from 'react-s-alert';
import config from '../../../sharedFiles/Config.jsx';

class SelectedAmenity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.removeAmenity = this.removeAmenity.bind(this);
  }

  // #################################################################################
  // sends the amenity to the server to be added to the db
  // #################################################################################
  removeAmenity() {
    // get user id and token
    const userID = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');
    const propertyID = this.props.propertyID;
    const amenityID = this.props.amenity.id;

    axios({

      method: 'delete',
      url: config.dashboardAPI + '/user/' + userID +
      '/properties/' + propertyID + '/amenities/' + amenityID,
      headers: config.headers(token)

    }).then((response) => this.props.handleResponse(response))
    .catch((error) => console.log(error));
  }

  // #################################################################################
  // renders html
  // #################################################################################
  render() {
    const { amenity } = this.props

    if (amenity.price) var price = '- Price: ' + String(amenity.price);

    if (amenity.extraCharge) var extraCharge = 'Extra charge: Yes'
    else var extraCharge = 'Extra charge: No'

    return (
      <div className="policy">
        <button type="button" className="close">
          <span className="x-btn" onClick={this.removeAmenity}>×</span>
        </button>
        <p>{amenity.name} - {extraCharge}</p>
      </div>

    )
  }

}

export default SelectedAmenity

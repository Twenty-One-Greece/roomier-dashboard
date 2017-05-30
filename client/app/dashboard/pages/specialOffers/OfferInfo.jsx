import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import config from '../../../sharedFiles/Config.jsx';
import moment from 'moment';

class OfferInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.deleteDate = this.deleteDate.bind(this);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  // Deletes a property according to the component props id
  deleteDate(propertyID) {
    const { store_SpecialOffers, offer } = this.props
    console.log(offer.d_id);
    // get user id and token
    const userID = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');

    axios({
      method: 'delete',
      url: config.dashboardAPI + '/user/' + userID + '/properties/' +
      propertyID + './specialOffers-dates/' + offer.d_id,
      headers: config.headers(token)
    })
    .then((response) => {

      if (response.data.error === 'noErrors') {
        $.notify(response.data.message, 'success');
        store_SpecialOffers.getDatesOffers(propertyID);

      } else $.notify(response.data.message, 'error');
    })
    .catch((error) => $.notify(error, 'error'))
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  // renders html
  render() {
    const { offer, propertyID } = this.props;
    let { d_stayDateStart, d_stayDateEnd } = offer
    let { d_bookingDateStart, d_bookingDateEnd } = offer
    let cumulative = null

    // check if dates are provided
    if(d_stayDateStart)
      d_stayDateStart = moment(d_stayDateStart).format('YYYY-MM-DD')
    else d_stayDateStart = <small>Not Provided</small>

    if(d_stayDateEnd)
      d_stayDateEnd = moment(d_stayDateEnd).format('YYYY-MM-DD')
    else d_stayDateEnd = <small>Not Provided</small>

    if(d_bookingDateStart)
      d_bookingDateStart = moment(d_bookingDateStart).format('YYYY-MM-DD')
    else d_bookingDateStart = <small>Not Provided</small>

    if(d_bookingDateEnd)
      d_bookingDateEnd = moment(d_bookingDateEnd).format('YYYY-MM-DD')
    else d_bookingDateEnd = <small>Not Provided</small>

    if (offer.o_cumulative) cumulative = 'Yes'
    else cumulative = 'No'

    return (
      <tr>
        <td>
          <small className="from-to">From:</small> {d_stayDateStart}<br />
          <small className="from-to">To:</small> {d_stayDateEnd}
        </td>

        <td>
          <small className="from-to">From:</small> {d_bookingDateStart}<br />
          <small className="from-to">To:</small> {d_bookingDateEnd}
        </td>

        <td>{offer.o_name}</td>

        <td>{cumulative}</td>

        <td>{offer.o_minimumStay}</td>

        <td>{offer.o_type}</td>

        <td>{offer.o_discount}%</td>

        <td>
          <a onClick={() => this.deleteDate(propertyID)}
          className="btn btn-default custom-btn-red">
          Delete </a>
        </td>
      </tr>
    )
  }

}

export default OfferInfo

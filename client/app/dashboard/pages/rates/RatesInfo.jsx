import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import moment from 'moment';

import config from '../../../sharedFiles/Config.jsx';

class RatesInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // deletes a single rate when button is clicked
  deleteRate () {
    const { rate, propertyID, roomTypeID, getRates } = this.props;
    const userID = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');

    axios({
      method: 'delete',
      url: config.dashboardAPI + '/user/' + userID + '/properties/' +
      propertyID + '/roomTypes/' + roomTypeID + '/rates/' + rate.id,
      headers: config.headers(token)

    }).then((response) => {

      if (response.data.error === 'noErrors') {
        $.notify(response.data.message, 'success');
        getRates();
      } else $.notify(response.data.message, 'error');

    }).catch((error) => $.notify(error, "error"));
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // render this component. and check what the abse plan is to display it visualy
  render() {
    const { rate, propertyID, roomTypeID } = this.props;

    if (rate.basePlan === 1) var basePlan = 'All Inclusive';
    if (rate.basePlan === 2) var basePlan = 'Full Board';
    if (rate.basePlan === 3) var basePlan = 'Half Board';
    if (rate.basePlan === 4) var basePlan = 'Bed & Breakfast';
    if (rate.basePlan === 5) var basePlan = 'Self Catering';
    if (rate.basePlan === 6) var basePlan = 'Room Only';

    return(
      <tr>
        <td style={{width: 15 + "%"}}>{rate.name}</td>

        <td style={{width: 25 + "%"}}>
          <small className="from-to">From: </small>
          {moment(rate.startDate).format('YYYY-MM-DD')} <br />
        <small className="from-to">To: </small>
          {moment(rate.endDate).format('YYYY-MM-DD')} <br />
        </td>

        <td> {basePlan} - {rate.basePlanPrice} </td>
        <td>{rate.minimumStay} Days</td>
        <td>{rate.extraPaxCharge}</td>

        <td style={{width: 25 + "%"}}>
          <Link to={'dashboard/properties/' + propertyID +
          '/roomTypes/' + roomTypeID + '/rates/' + rate.id }
          className="btn btn-default custom-btn-green">
          Edit Rate </Link>

        <a className="btn btn-default custom-btn-red"
          onClick = { this.deleteRate.bind(this) }>
          Delete </a>
        </td>
      </tr>
    )
  }

}

export default RatesInfo

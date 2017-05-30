import React from 'react';
import axios from 'axios';
import Alert from 'react-s-alert';

import config from '../../../sharedFiles/Config.jsx';

class CancelationFee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.form = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // handle form change and pass it to the state so as to send it to the server
  handleChange(key) {
    return (e) => this.form[key] = e.target.value
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // submit data to server
  handleSubmit() {
    const token = window.localStorage.token
    const userID = window.localStorage.id
    const propertyID = this.props.propertyID
    const { chargeType } = this.props

    // Format data
    this.form.userID = userID
    this.form.typeOfPenalty = 1 // Cancelation penalty
    this.form.propertyID = propertyID

    // Determine charge type depending on users choice
    if (chargeType === 'amount') this.form.chargeType = 1
    else this.form.chargeType = 0

    axios({

      method: 'post',
      url: config.dashboardAPI + '/user/' + userID + '/properties/' +
      propertyID + '/cancelPolicies/new',
      headers: config.headers(token),
      data: this.form

    }).then((response) => this.props.handleResponse(response)
    ).catch((error) => $.notify(error, 'error'));
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // render html
  render() {
    const {chargeType} = this.props

    // Change text according to charge type selected
    if (chargeType === 'amount') {
      this.placeholder = "Amount (%)"
      this.text = "% of the total booking amount"
    } else if (chargeType === 'nights') {
      this.placeholder = "Nights (number)"
      this.text = "nights of stay"
    }

    return (
    <div className="row">
      <div className="col-xs-12">

        <h2 className="">Cancelation fee</h2>

        Cancelation up to

        <input type="number" required="required" placeholder="Days"
        onChange={this.handleChange('days')}className="days" />

        days prior to arrival date, a cancellation fee equal to

        <input type="number" required="required"
        placeholder={this.placeholder}
        onChange={this.handleChange('value')}className="days " />

        {this.text} is applicable.&nbsp;

        <br /><br />
        <button type="button" onClick={this.handleSubmit}
        className="btn btn-success">Add Cancelation Fee</button>

      </div>
    </div>
    )
  }

}

export default CancelationFee;

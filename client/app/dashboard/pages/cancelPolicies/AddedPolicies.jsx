import React from 'react';
import axios from 'axios';
import Alert from 'react-s-alert';

import config from '../../../sharedFiles/Config.jsx';

class AddedPolicies extends React.Component {
  constructor(props) {
    super(props)
    this.removePolicy = this.removePolicy.bind(this)
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Removes policy
  removePolicy() {
    const userID = window.localStorage.getItem('id')
    const token = window.localStorage.getItem('token')
    const { handleResponse, propertyID, policy } = this.props
    const headers = {headers: config.headers(token)}
    const URL = config.dashboardAPI + '/user/' + userID + '/properties/' +
          propertyID + '/cancelPolicies/' + policy.id

    axios.delete(URL, headers).then((response) => handleResponse(response))
    .catch((error) => $.notify(error, 'error'))
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    const { policy } = this.props
    let text = ""
    let chargeText = ""

    // 1 === percent of booking, 0 === nights of booking
    if (policy.chargeType) chargeText = "% of the total booking amount"
    else chargeText = "nights of stay"

    // 1 = Cancelation penalty, 2 = No-show penalty, 3 = Early departure penalty
    if (policy.typeOfPenalty === 1) {
      text = <p>Cancelation up to <strong> {policy.days} </strong>
      days prior to arrival date,
      a cancellation fee equal to <strong> {policy.value} </strong>
      {chargeText} is applicable.</p>

    } else if (policy.typeOfPenalty === 2) {
      text = <p>No show penalty fee is equal to
      <strong> {policy.value} </strong>
      {chargeText} is applicable.</p>

    } else if (policy.typeOfPenalty === 3) {
      text = <p>Early departure penalty fee is equal to
      <strong> {policy.value} </strong>
      {chargeText} is applicable.</p>
    }

    return (
      <div className="list-item-green policy">
        <button type="button" className="close">
          <span className="x-btn" onClick={this.removePolicy}>×</span>
        </button>
          {text}
      </div>
    )
  }

}

export default AddedPolicies

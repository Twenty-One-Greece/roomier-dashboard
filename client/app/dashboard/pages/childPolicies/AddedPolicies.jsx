import React from 'react';
import axios from 'axios';

import config from '../../../sharedFiles/Config.jsx';


// ---------------------------------------------------------------------------
// Renders each property info
class AddedPolicies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.removePolicy = this.removePolicy.bind(this);
  }

  // ---------------------------------------------------------------------------
  // removes policy
  removePolicy() {
    const userID = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');
    const propertyID = this.props.propertyID;
    const childPolicyID = this.props.policy.id;

    axios({
      method: 'delete',
      url: config.dashboardAPI + '/user/' + userID + '/properties/' +
      propertyID + '/childPolicies/' + childPolicyID,
      headers: config.headers(token)
    })
    .then((response) => this.props.handleResponse(response))
    .catch((error) => $.notify(error, 'error'));
  }

  // ---------------------------------------------------------------------------
  // renders html
  render() {
    const { policy } = this.props;

    return (
      <div className="policy">
        <button type="button" className="close">
          <span className="x-btn" onClick={this.removePolicy}>×</span>
        </button>
        <p>Child up to <strong> {policy.age} </strong>
        years old will be considered a child group
        </p>
      </div>
    )
  }

}

export default AddedPolicies

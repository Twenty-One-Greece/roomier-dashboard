import React from 'react';
import axios from 'axios';
import Alert from 'react-s-alert';

import config from '../../../sharedFiles/Config.jsx';
import BackButton from '../../components/BackButton.jsx';
import AddedPolicies from './AddedPolicies.jsx';
import CancelationFee from './CancelationFee.jsx';
import NoShowFee from './NoShowFee.jsx';
import EarlyDepartureFee from './EarlyDepartureFee.jsx';

class CancelPolicies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      policies: [],
      chargeType: 'amount'
    };
    this.getCancelPolicies = this.getCancelPolicies.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
    this.chargeTypeChange = this.chargeTypeChange.bind(this)
  }


  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Before the component mount ask server for all Cancelation policies
  componentWillMount() { this.getCancelPolicies() }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // this function is called when we want to get all the Cancelation policies.
  // ex when component mounts or when properties have been updated
  getCancelPolicies() {
    // get user id and token
    const userID = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');
    const propertyID = this.props.params.propertyID;
    const headers = {headers: config.headers(token)}
    const URL = config.dashboardAPI + '/user/' + userID +
        '/properties/' + propertyID + '/cancelPolicies'

    axios.get(URL, headers).then((response) => {
      if (response.data.error === "noErrors")
        this.setState({policies: response.data.cancelPolicies})
      else $.notify(response.data.message, 'error');

    }).catch((error) => $.notify(error, 'error'));
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // handles response from child components
  handleResponse(response) {
    if (response.data.error === "noErrors") {
      Alert.success(response.data.message, 'success');
      this.getCancelPolicies();
    } else Alert.error(response.data.message);
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  chargeTypeChange(e) { this.setState({chargeType: e.target.value}) }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // render html
  render() {
    let policies = this.state.policies.map((policy) => {
      return <AddedPolicies
                policy={policy}
                key={policy.id}
                handleResponse={this.handleResponse}
                propertyID={this.props.params.propertyID}/>
    })

    return (
    <div className="row">
      <div className="col-xs-12 breadcump">
        Property ID:{this.props.params.propertyID} / Cancelation Policies
      </div>
      <div className="col-xs-12">
        <div className="x_panel">
          <div className="x_title">
            <BackButton />
            <div className="right col-md-3 col-sm-3 col-xs-12">
              <select className="form-control"
              onChange={this.chargeTypeChange}>
                <option value="amount">Amount (percent)</option>
                <option value="nights">Number Of Nights</option>
              </select>
            </div>
            <div className="clearfix"></div>
          </div>
          <div className="x_content">
            <div className="row">
              <div className="col-xs-6">

                <CancelationFee
                    chargeType = {this.state.chargeType}
                    propertyID={this.props.params.propertyID}
                    handleResponse={this.handleResponse}
                />
                <NoShowFee
                    chargeType = {this.state.chargeType}
                    propertyID={this.props.params.propertyID}
                    handleResponse={this.handleResponse}
                />
                <EarlyDepartureFee
                    chargeType = {this.state.chargeType}
                    propertyID={this.props.params.propertyID}
                    handleResponse={this.handleResponse}
                />
              </div>

              <div className="col-sm-offset-1 col-xs-5">
                {policies}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

}

export default CancelPolicies;

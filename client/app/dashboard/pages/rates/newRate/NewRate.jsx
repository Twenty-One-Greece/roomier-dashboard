import React from 'react';
import axios from 'axios';
import Wizard from 'rc-wizard';
import { Link, browserHistory } from 'react-router';
import Wiz_Dates from './Wiz_Dates.jsx';
import Wiz_Settings from './Wiz_Settings.jsx';
import Wiz_ChildPolicies from './Wiz_ChildPolicies.jsx';
import store_NewRate from './Store_NewRate.jsx';
import store_Property from '../../../Stores/Store_Property.js'
import BackButton from '../../../components/BackButton.jsx';

class NewRate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.submitForm = this.submitForm.bind(this);
    this.addRatePolicy = this.addRatePolicy.bind(this);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Reset rate info for safety
  componentWillMount() { store_NewRate.rateInfo = {} }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // When the user submits the new rate
  addRatePolicy(policy, type) {
    if (type === 'child') this.rates_childPolicies.push(policy);
    if (type === 'cancel') this.rates_cancelPolicies.push(policy);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // When the user submits the new rate
  removeRatePolicy(policy, type) {
    if (type === 'child') this.rates_childPolicies.splice(policy, 1);
    if (type === 'cancel') this.rates_cancelPolicies.splice(policy, 1);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // When the user submits the new rate
  submitForm() {
    const roomTypeID = this.props.params.roomTypeID;
    const propertyID = this.props.params.propertyID;

    store_NewRate.postData(roomTypeID, propertyID)
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Renders html
  render() {
    let { params } = this.props;

    return(
    <div className="col-md-12 col-sm-12 col-xs-12">
      <div className="col-xs-12 breadcump">
        Property ID:{this.props.params.propertyID} /
        Room Type ID: {this.props.params.propertyID} /
        Rates / New Rate
    </div>
      <div className="x_panel">
        <div className="x_title">
          <BackButton />
          <div className="clearfix"></div>
        </div>
        <div className="x_content">
          <Wizard id="test" onDone={this.submitForm}>

            <Wizard.Step key="1">
              <Wiz_Dates store_NewRate={store_NewRate} />
            </Wizard.Step>

            <Wizard.Step key="2">
              <Wiz_Settings
                propertyID={params.propertyID}
                roomTypeID={params.roomTypeID}
                store_Property={store_Property}
                store_NewRate={store_NewRate}
              />
            </Wizard.Step>

            <Wizard.Step key="3">
              <Wiz_ChildPolicies
                propertyID={params.propertyID}
                store_Property={store_Property}
                store_NewRate={store_NewRate}
              />
            </Wizard.Step>
          </Wizard>

        </div>
      </div>
    </div>
    )
  }

}

export default NewRate

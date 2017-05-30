import React from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';

import config from '../../../sharedFiles/Config.jsx';
import BackButton from '../../components/BackButton.jsx';
import AddedPolicies from './AddedPolicies.jsx';
import AddPolicy from './AddPolicy.jsx';
import store_Property from '../../Stores/Store_Property.js';
import store_ChildPolicies from '../../Stores/Store_ChildPolicies.js';

@observer
class ChidPolicies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleResponse = this.handleResponse.bind(this);
  }


  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Before the component mount ask server for all Cancelation policies
  componentWillMount() {
    const { propertyID } = this.props.params;
    store_ChildPolicies.getChildPolicies(propertyID)
    store_Property.getProperty(propertyID)
  }


  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  handleResponse(response) {
    const { propertyID } = this.props.params;
    store_ChildPolicies.getChildPolicies(propertyID);

    (response.data.error === "noErrors")
    ? $.notify(response.data.message, 'success')
    : $.notify(response.data.message, 'error');
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    let policies = store_ChildPolicies.policies.map((policy) => {
      return <AddedPolicies
                policy={policy}
                key={policy.id}
                handleResponse={this.handleResponse}
                propertyID={this.props.params.propertyID} />
    })

    return (
      <div className="row">
        <div className="col-xs-12 breadcump">
          Property ID:{this.props.params.propertyID} / Child Policies
        </div>
        <div className="col-xs-12">
          <div className="x_panel">
            <div className="x_title">
              <BackButton />
              <ul className="nav navbar-right panel_toolbox">
                <li>
                  <a className="" data-toggle="modal"
                  data-target="#AddAmenity">
                  </a>
                </li>
              </ul>
              <div className="clearfix"></div>
            </div>
            <div className="x_content">

              <div className="row">
                <div className="col-xs-6">

                  <AddPolicy
                      propertyID={this.props.params.propertyID}
                      roomTypeID={this.props.params.roomTypeID}
                      handleResponse={this.handleResponse}
                  />

                </div>

                <div className="col-sm-offset-1 col-xs-5">

                  <h2> Selected Child Policies </h2>

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

export default ChidPolicies;

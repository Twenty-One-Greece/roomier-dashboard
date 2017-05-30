import React from 'react';
import axios from 'axios';

import config from '../../../sharedFiles/Config.jsx';
import BackButton from '../../components/BackButton.jsx';
import AvailableService from './AvailableService.jsx';
import SelectedService from './SelectedService.jsx';
import AddOwnService from './AddOwnService.jsx';

// -----------------------------------------------
// Renders main page
class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: []
    };
    // TODO: Replace this with actual list
    this.availableServices = ['Transer to airport', 'Transer to Post', 'Transer to City'];

    this.getServices = this.getServices.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  // -----------------------------------------------
  // Before the component mount ask server for all properties
  componentWillMount() { this.getServices() }

  // -----------------------------------------------
  // gets all the propertis. ex when component mounts or when properties have been updated
  getServices() {
    // get user id and token
    const userID = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');
    const propertyID = this.props.params.propertyID;

    axios({

      method: 'get',
      url: config.dashboardAPI + '/user/' + userID +
      '/properties/' + propertyID + '/services',
      headers: config.headers(token)

    }).then((response) => {

      if (response.data.error === "noErrors")
        this.setState({services: response.data.services})
      else {
        this.setState({services: []});
        $.notify(response.data.message, 'error');
      }

    }).catch((error) => $.notify(error, 'error'));
  }

  // -----------------------------------------------
  // gets response from components and displays message
  handleResponse(response) {
    this.getServices();

    if (response.data.error === "noErrors")
      $.notify(response.data.message, 'success')
    else $.notify(response.data.message, 'error');
  }


  // -----------------------------------------------
  // render html
  render() {

    let addPaidServices = (
      <span style={{color: 'white'}}><i className="fa fa-plus"></i>
      &nbsp; Add your own service</span>
    );
    // create available services
    let availableServices = this.availableServices.map((availableService, i) => {
      return <AvailableService
                handleResponse={this.handleResponse}
                propertyID={this.props.params.propertyID}
                key={i} service={availableService} />
    });

    // create selected services
    let selectedServices = this.state.services.map((selectedService, i) => {
       return <SelectedService
                handleResponse={this.handleResponse}
                propertyID={this.props.params.propertyID} key={i}
                service={selectedService} />
    });

    if (selectedServices.length >= 25) {
        availableServices = <h2>You can't add more than 7 services.</h2>;
        addPaidServices = null;
    }

    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="x_panel">
            <div className="x_title">
            <BackButton />
              <h2 className="pageHeader">
              Services of property with ID: {this.props.params.propertyID}</h2>
              <ul className="nav navbar-right panel_toolbox">
                <li>
                  <a className="btn btn-success custom-btn-action"
                  data-toggle="modal" data-target="#AddService">
                    {addPaidServices}
                  </a>
                </li>
              </ul>
              <div className="clearfix"></div>
            </div>
            <div className="x_content">
              <div className="row">
                <div className="col-sm-5">
                  <h2> Available Services </h2>
                  <small>You can add any of the services below just by clicking on them. Their default price is 0. To add a paid service click on the 'Add paid service' button.</small> <br /><br />
                  {availableServices}
                </div>
                <div className="col-sm-offset-2 col-sm-5">
                  <h2> Selected Services </h2>
                  <small>Below are the services you have chosen for your property. Clicking the 'x' button will remove the service.</small> <br /><br />
                  <div>{selectedServices}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddOwnService
          propertyID={this.props.params.propertyID}
          handleResponse={this.handleResponse}
        />
      </div>
    )
  }

}

export default Services;

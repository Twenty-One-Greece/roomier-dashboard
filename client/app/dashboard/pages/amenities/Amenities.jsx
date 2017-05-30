import React from 'react';
import axios from 'axios';

import config from '../../../sharedFiles/Config.jsx';
import BackButton from '../../components/BackButton.jsx';
import AvailableAmenity from './AvailableAmenity.jsx';
import SelectedAmenity from './SelectedAmenity.jsx';
import AddOwnAmenity from './AddOwnAmenity.jsx';

class Properties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amenities: []
    };
    this.availableAmenities = ['Restaurant', 'Multiple restaurants', 'Outdoor pool', 'Indoor pool', 'Heated Pool', 'Children Pool', 'Bar', 'Pool bar', 'Snack Bar', 'Spa', 'Massage', 'Hammam', 'Sauna', 'Fitness Centre', 'Beach', 'Sunbeds & umbrellas at the beach', 'Parking', 'Wi-Fi',
    '24 Hour Front Desk', 'Concierge', 'Bellboy', 'Room Service', 'On Site ATM', 'Gift Shop', 'Minimarket', 'Babysitting', 'Children Club', 'Playground', 'Facilities for disabled guests', 'Connecting Rooms', 'Soundproof rooms', 'Business center', 'Meeting and Banquet Facilities', 'Sports', 'Watersports'];

    this.getAmenities = this.getAmenities.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }


  // ---------------------------------------------------------------------------
  // Before the component mount ask server for all properties
  componentWillMount() { this.getAmenities() }

  // ---------------------------------------------------------------------------
  // this function is called when we want to get all the propertis.
  // ex when component mounts or when properties have been updated
  getAmenities() {
    // get user id and token
    const userID = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');
    const propertyID = this.props.params.propertyID;

    axios({

      method: 'get',
      url: config.dashboardAPI + '/user/' + userID + '/properties/' +
      propertyID + '/amenities',
      headers: config.headers(token)

    }).then((response) => {

      if (response.data.error === "noErrors")
        this.setState({amenities: response.data.amenities})
      else {
        this.setState({amenities: []});
        $.notify(response.data.message, 'error');
      }

    }).catch((error) => $.notify(error, 'error'));
  }

  // ---------------------------------------------------------------------------
  // handles the response from components
  handleResponse(response) {

    if (response.data.error === "noErrors") {
      $.notify(response.data.message, 'success');
      this.getAmenities();

    } else $.notify(response.data.message, 'error');
  }


  // ---------------------------------------------------------------------------
  // render html
  render() {
    let addPaidAmenities = (
      <span style={{color: 'white'}}><i className="fa fa-plus"></i>
      &nbsp; Add your own amenity</span>
    );

    // create available amenities
    let availAmenities = this.availableAmenities.map((availAmenity, i) => {
      return <AvailableAmenity
                handleResponse={this.handleResponse}
                propertyID={this.props.params.propertyID}
                key={i} amenity={availAmenity} />
    });

    // create selected amenities
    let selectedAmenities = this.state.amenities.map((selectedAmenity, i) => {
       return <SelectedAmenity
                key={i}
                handleResponse={this.handleResponse}
                propertyID={this.props.params.propertyID}
                amenity={selectedAmenity} />
    });

    return (
      <div className="row">
        <div className="col-xs-12 breadcump">
          Property ID:{this.props.params.propertyID} / Amenities
        </div>
        <div className="col-xs-12">
          <div className="x_panel">
            <div className="x_title">
            <BackButton />
              <h2 className="pageHeader"></h2>
              <ul className="nav navbar-right panel_toolbox">
                <li>
                  <a className="btn btn-success custom-btn-action"
                    data-toggle="modal" data-target="#AddAmenity">
                    {addPaidAmenities}
                  </a>
                </li>
              </ul>
              <div className="clearfix"></div>
            </div>
            <div className="x_content">
              <div className="row">
                <div className="col-sm-5">
                  <h2> Available Amenities </h2>
                  <small className="hint">You can add any of the amenities below just by clicking on them. Their default price is 0. To add a paid amenity click on the 'Add paid amenity' button.</small> <br /><br />
                  {availAmenities}

                </div>
                <div className="col-sm-offset-2 col-sm-5">
                  <h2> Selected Amenities </h2>
                  <small className="hint">Below are the amenities you have chosen for your property. Clicking the 'x' button will remove the amenity.</small> <br /><br />
                <div>{selectedAmenities}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddOwnAmenity
          propertyID={this.props.params.propertyID}
          handleResponse={this.handleResponse}/>
      </div>
    )
  }

}

export default Properties;

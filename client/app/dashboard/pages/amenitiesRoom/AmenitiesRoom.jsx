import React from 'react';
import axios from 'axios';
import config from '../../../sharedFiles/Config.jsx';
import BackButton from '../../components/BackButton.jsx';
import AvailableAmenity from './AvailableAmenity.jsx';
import SelectedAmenity from './SelectedAmenity.jsx';
import AddOwnAmenity from './AddOwnAmenity.jsx';

class AmenitiesRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amenities: []
    };

    this.availableAmenities = ['Double Bed', 'Twin Bed', 'Double or Twin Bed', 'Queen Bed', 'King-Size Bed', 'Sofa Bed', 'Shower', 'Bathtub', 'Jacuzzi Bathtub', 'Bathroom Amenities', 'Bathrobes', 'Slippers', 'Towels & Linen', 'Sitting Area', 'Dining area', 'Desk', 'Safe', 'Hairdryer', 'Telephone', 'Minibar', 'Refrigerator', 'Coffee & tea making facilities', 'Flat screen TV', 'Satellite Channels', 'Wi-Fi', 'Air-conditioning', 'Heating', 'Terrace', 'Balcony', 'Terrace or Balcony with outdoor furniture', 'Sea View', 'Partial Sea View', 'Mountain View', 'Garden View', 'City View', 'Landmark View'];

    this.getAmenities = this.getAmenities.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
  }

  // ---------------------------------------------------------------------------
  // Before the component mount ask server for all properties
  componentWillMount() {
    this.getAmenities();
  }

  // ---------------------------------------------------------------------------
  // this function is called when we want to get all the propertis.
  // ex when component mounts or when properties have been updated
  getAmenities() {
    // get user id and token
    const userID = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');
    const propertyID = this.props.params.propertyID;
    const roomTypeID = this.props.params.roomTypeID;

    axios({

      method: 'get',
      url: config.dashboardAPI + '/user/' + userID + '/properties/' +
      propertyID + '/roomTypes/' + roomTypeID + '/amenities',
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
  // handleResponse from all components
  handleResponse(response) {
    this.getAmenities();
    if (response.data.error === "noErrors")
      $.notify(response.data.message, 'success')
    else $.notify(response.data.message, 'error');
  }


  // ---------------------------------------------------------------------------
  // render html
  render() {
    let addPaidAmenities = (
      <span style={{color: 'white'}}><i className="fa fa-plus"></i>
      &nbsp; Add your own amenity</span>
    );

    // create available amenities
    let availableAmenities = this.availableAmenities.map((availableAmenity, i) => {
      return <AvailableAmenity
                handleResponse={this.handleResponse}
                propertyID={this.props.params.propertyID}
                key={i}
                amenity={availableAmenity}
                roomTypeID={this.props.params.roomTypeID}/>
    })

    // create selected amenities
    let selectedAmenities = this.state.amenities.map((selectedAmenity, i) => {
       return <SelectedAmenity
                 handleResponse={this.handleResponse}
                 propertyID={this.props.params.propertyID}
                 key={i}
                 amenity={selectedAmenity}
                 roomTypeID={this.props.params.roomTypeID}/>
    });

    // allow up to 7 amenities
    if (selectedAmenities.length >= 25) {
      availableAmenities = <h2>You can't add more than 7 amenities.</h2>;
      addPaidAmenities = null;
    }

    return (
      <div className="row">
        <div className="col-xs-12 breadcump">
          Property ID:{this.props.params.propertyID} /
          Room Type ID: {this.props.params.propertyID} /
          Room Amenities
        </div>
        <div className="col-xs-12">
          <div className="x_panel">
            <div className="x_title">
            <BackButton />
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
                  <h2> Available Room Amenities </h2>
                  <small>You can add any of the amenities below just by clicking on them. Their default price is 0. To add a paid amenity click on the 'Add paid amenity' button.</small> <br /><br />
                  {availableAmenities}

                </div>
                <div className="col-sm-offset-2 col-sm-5">
                  <h2> Selected Room Amenities </h2>
                  <small>Below are the amenities you have chosen for your property. Clicking the 'x' button will remove the amenity.</small> <br /><br />
                  <div>{selectedAmenities}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddOwnAmenity
            propertyID={this.props.params.propertyID}
            handleResponse={this.handleResponse}
            roomTypeID={this.props.params.roomTypeID}/>
      </div>
    )
  }

}

export default AmenitiesRoom;

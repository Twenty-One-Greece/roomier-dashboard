import React from 'react';
import axios from 'axios';
import Alert from 'react-s-alert';

import { Link, Route, browserHistory } from 'react-router'
import config from '../../../sharedFiles/Config.jsx';
import BackButton from '../../components/BackButton.jsx';


class EditRoomType extends React.Component {
constructor(props) {
  super(props)
  this.state = {
    "name": '',
  	"description": '',
  	"size": '',
  	"totalRooms": '',
  	"maxPax": '',
  	"maxAdults": '',
  	"maxChildren": '',
  	"maxInfants": '',
    "baseOccupancy": '',
  }

    // bind the functions to this
    this.handleChange = this.handleChange.bind(this);
    this.updateRoomType = this.updateRoomType.bind(this);
    this.RenderForm = this.RenderForm.bind(this);
  }

  // ---------------------------------------------------------------------------
  // before the component mounts request the property data from the server
  componentWillMount() {
    // get user id and token
    const userID = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');
    const propertyID = this.props.params.propertyID;
    const roomTypeID = this.props.params.roomTypeID;

    axios({

      method: 'get',
      url: config.dashboardAPI + '/user/' + userID + '/properties/' +
      propertyID + '/roomTypes/' + roomTypeID,
      headers: config.headers(token)

    }).then((response) => this.setState({...response.data.roomTypes[0]}))
    .catch((error) => Alert.error(response.data.message));
  }

  // ---------------------------------------------------------------------------
  // send the new info back to the server
  updateRoomType() {
    // get user id and token
    const userID = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');
    const propertyID = this.props.params.propertyID;
    const roomTypeID = this.props.params.roomTypeID;

    axios({

      method: 'put',
      url: config.dashboardAPI + '/user/' + userID + '/properties/' +
      propertyID + '/roomTypes/' + roomTypeID,
      headers: config.headers(token),
      data: this.state

    }).then((response) => {

      if (response.data.error === "noErrors") {

        $.notify(response.data.message, "success");
        setTimeout( () => browserHistory.goBack(), 2000);

      } else $.notify(response.data.message, "error"); console.log(this.state);

    }).catch((error) => Alert.error(error));
  }

  // ---------------------------------------------------------------------------
  // handle form change and pass it to the state so as to send it to the server
  handleChange(key) {
    return (e) => {
      // set state acording to the string passed from the inputs
      var state = {};
      state[key] = e.target.value;
      // set state
      this.setState(state);
    }
  }


  // ---------------------------------------------------------------------------
  // render html
  render() {
    return (
      <div className="row">
        <div className="col-xs-12 breadcump">
          Property ID:{this.props.params.propertyID} /
          Room Type ID: {this.props.params.propertyID} /
          Edit
        </div>
        <div className="col-md-12">
          <div className="x_panel">
            <div className="x_title">
             <BackButton />
              <h2 className="pageHeader">
              Editing Room Type {this.state.name} with ID: {this.props.params.roomTypeID}</h2>
              <ul className="nav navbar-right panel_toolbox">
              </ul>
              <div className="clearfix"></div>
            </div>
            <div className="x_content">

              {this.RenderForm()}

              <br />
              <a onClick={browserHistory.goBack}
              className="btn btn-default"> Back </a>

              <a onClick={this.updateRoomType}
              className="btn btn-success">Save</a>

            </div>
          </div>
        </div>
        <Alert stack={{limit: 1}} timeout={3000} html={true}/>
      </div>
    )
  }

  // -----------------------------------------------
  // render form
  RenderForm(){
    return(
      <div className="row">

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
        <label>Room Type Name*</label>
          <input type="text" required="required"
          value={this.state.name}
          onChange={this.handleChange('name')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
        <label>Room Type Size*</label>
          <input type="number" required="required"
          value={this.state.size}
          onChange={this.handleChange('size')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
        <label>Maximum PAX*</label>
          <input type="number" required="required"
          value={this.state.maxPax}
          onChange={this.handleChange('maxPax')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
        <label>Maximum Adult*</label>
          <input type="number" required="required"
          value={this.state.maxAdults}
          onChange={this.handleChange('maxAdults')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
        <label>Maximum Children*</label>
          <input type="number" required="required"
          value={this.state.maxChildren}
          onChange={this.handleChange('maxChildren')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
        <label>Maximum Infants*</label>
          <input type="number" required="required"
          value={this.state.maxInfants}
          onChange={this.handleChange('maxInfants')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
        <label>Base Occupancy*</label>
          <input type="number" required="required"
          value={this.state.baseOccupancy}
          onChange={this.handleChange('baseOccupancy')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-12 col-sm-12 col-xs-12">
        <label>Room Type Description*</label>
          <textarea type="text" rows="3" required="required" placeholder="Room Type Description*"
          value={this.state.description}
          onChange={this.handleChange('description')}
          className="form-control col-md-7 col-xs-12" />
        </div>

      </div>
    )
  }

}

export default EditRoomType

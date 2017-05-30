import React from 'react';
import axios from 'axios';
import { Link, Route, browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import Alert from 'react-s-alert';

import config from '../../../sharedFiles/Config.jsx';
import BackButton from '../../components/BackButton.jsx';
import store_Property from '../../Stores/Store_Property.js';

@observer
class EditProperty extends React.Component {
constructor(props) {
  super(props)

    // bind the functions to this
    this.handleChange = this.handleChange.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
    this.RenderForm = this.RenderForm.bind(this);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // before the component mounts request the property data from the server
  componentWillMount() {
    let { propertyID } = this.props.params;
    store_Property.getProperty(propertyID);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // handle form change and pass it to the state
  handleChange(key) {
    return (e) => store_Property.property[key] = e.target.value;
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // send the new info back to the server
  updateProperty() {
    const userID = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');
    const propertyID = this.props.params.propertyID;
    const headers = {headers: config.headers(token)}
    const data = store_Property.property
    const URL = config.dashboardAPI + '/user/' + userID +
          '/properties/' + propertyID

    axios.put(URL, data, headers).then((response) => {

      if (response.data.error === "noErrors") {
        Alert.success(response.data.message);
        setTimeout( () => browserHistory.goBack(), 400);
      } else Alert.error(response.data.message);

    }).catch((error) => $.notify(error, 'error'));
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  // render html
  render() {
    const { property } = store_Property;
    const { propertyID } = this.props.params

    return (
      <div className="row">
        <div className="col-xs-12 breadcump">
          Property ID:{this.props.params.propertyID} / Edit
        </div>
        <div className="col-md-12">
          <div className="x_panel">
            <div className="x_title">
              <BackButton />
              <ul className="nav navbar-right panel_toolbox">
              </ul>
              <div className="clearfix"></div>
            </div>
            <div className="x_content">

              {this.RenderForm()}

              <br />

              <Link to={'dashboard/properties'}
              className="btn btn-default">Back </Link>

              <a onClick={this.updateProperty}
              className="btn btn-default custom-btn-green">Save </a>

            </div>
          </div>
        </div>
      </div>
    )
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // render form
  RenderForm(){
    let { property } = store_Property;

    return(
      <div className="row">
      <div className="clearfix"></div>
      <h3 className="col-md-12 col-sm-12 col-xs-12">Basic Settings: {property.name}</h3>
      <br />

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property Name*</label>
          <input type="text" required="required"
          value={property.name}
          onChange={this.handleChange('name')}
          className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Active</label>
          <select
          value={property.active}
          onChange={this.handleChange('active')}
          className="form-control" required="required">
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property Email*</label>
          <input type="text" required="required"
           value={property.email}
           onChange={this.handleChange('email')}
           className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property Phone*</label>
          <input type="text" required="required"
           value={property.phone}
           onChange={this.handleChange('phone')}
           className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property Fax</label>
          <input type="text"
           value={property.fax}
           onChange={this.handleChange('fax')}
           className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property Country*</label>
          <input type="text" required="required"
           value={property.country}
           onChange={this.handleChange('country')}
           className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property City*</label>
          <input type="text" required="required"
           value={property.city}
           onChange={this.handleChange('city')}
           className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property Address*</label>
          <input type="text" required="required"
          value={property.address}
          onChange={this.handleChange('address')}
          className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property Zip*</label>
          <input type="text" required="required"
          value={property.zip}
          onChange={this.handleChange('zip')}
          className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Longitude</label>
          <input type="text"
          value={property.longitude}
          onChange={this.handleChange('longitude')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Latitude</label>
          <input type="text"
          value={property.latitude}
          onChange={this.handleChange('latitude')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Website Link*</label>
          <input type="text"
          value={property.website}
          onChange={this.handleChange('website')}
          className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property Owner Name*</label>
          <input type="text" required="required"
          value={property.ownerName}
          onChange={this.handleChange('ownerName')}
          className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property Owner Email*</label>
          <input type="text" required="required"
           value={property.ownerEmail}
           onChange={this.handleChange('ownerEmail')}
           className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property Owner Phone*</label>
          <input type="text"
           value={property.ownerPhone}
           onChange={this.handleChange('ownerPhone')}
           className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Currency</label>
          <input type="text"
           value={property.currency}
           onChange={this.handleChange('currency')}
           className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Stars</label>
          <select
          onChange={this.handleChange('stars')}
          value={property.stars}
          className="form-control"
          required="required">
            <option value="0">Select</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>What is considered infant for this property?</label>
          <select
          onChange={this.handleChange('considerInfant')}
          value={property.considerInfant}
          className="form-control"
          required="required">
            <option>Select</option>
            <option value="1">Children Up to 1 years old</option>
            <option value="2">Children Up to 2 years old</option>
            <option value="3">Children Up to 3 years old</option>
          </select>
        </div>

        <br />
        <div className="clearfix"></div>
        <h3 className="col-md-12 col-sm-12 col-xs-12">Meal Plans</h3>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Supports Room Only?</label>
          <select
          value={property.roomOnly}
          onChange={this.handleChange('roomOnly')}
          className="form-control" required="required">
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>


        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Supports All Inclusive?</label>
          <select
          value={property.allInclusive}
          onChange={this.handleChange('allInclusive')}
          className="form-control" required="required">
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Supports Full Board?</label>
          <select
          value={property.fullBoard}
          onChange={this.handleChange('fullBoard')}
          className="form-control" required="required">
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Supports Half Board?</label>
          <select
          value={property.halfBoard}
          onChange={this.handleChange('halfBoard')}
          className="form-control" required="required">
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Supports Bed and Breakfast?</label>
          <select
          value={property.bedAndBreakfast}
          onChange={this.handleChange('bedAndBreakfast')}
          className="form-control" required="required">
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Supports Self Catering?</label>
          <select
          value={property.selfCatering}
          onChange={this.handleChange('selfCatering')}
          className="form-control" required="required">
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <br />
        <div className="clearfix"></div>
        <h3 className="col-md-12 col-sm-12 col-xs-12">Descriptions</h3>


        <div className="form-group col-md-12 col-sm-12 col-xs-12">
          <label>Property Short Description*</label>
          <textarea type="text" required="required"
          value={property.shortDescription}
          onChange={this.handleChange('shortDescription')}
          className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-12 col-sm-12 col-xs-12">
          <label>Property Long Description*</label>
          <textarea type="text" rows="3" required="required"
           value={property.longDescription}
           onChange={this.handleChange('longDescription')}
           className="form-control col-md-7 col-xs-12"/>
        </div>

      </div>
      
    )
  }

}

export default EditProperty

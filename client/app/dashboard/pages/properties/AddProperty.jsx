import React from 'react';
import axios from 'axios';
import Images from './Images.jsx';
import config from '../../../sharedFiles/Config.jsx';
import Alert from 'react-s-alert';

class AddProperty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: 'noError',
      files: null
    };
    // all data will be stored here before sent to the server
    this.form = {};

    // bind the functions to this
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.RenderForm = this.RenderForm.bind(this);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // handle form change and pass it to the state so as to send it to the server
  handleChange(key) {
    return (e) => {
      this.form[key] = e.target.value;
    };
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // when the user submits the new property
  onSubmit(e) {
    e.preventDefault();
    const token = window.localStorage.token;
    const userID = window.localStorage.id;
    this.form.userID = userID;

    axios({

      method: 'post',
      url: config.dashboardAPI + '/user/' + userID + '/properties/new',
      headers: config.headers(token),
      data: this.form

    }).then((response) => {

      if (response.data.error === "noErrors") {
        $('#AddProperty').modal('hide');
        this.props.getProperties();
      } else Alert.error(response.data.message);

    }).catch((error) => Alert.error(error, "error"));
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // renders html
  render() {
    return(
      <div className="modal fade" id="AddProperty" tabIndex="-1"
      role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
        <form onSubmit={this.onSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close"
              data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">
              Add new Property </h4>
              <small>Required fields have a star (*)</small>
            </div>
            <div className="modal-body">

              {this.RenderForm()}

            </div>
            <div className="modal-footer">
              <button type="button"
              className="btn btn-default"
              data-dismiss="modal">Close</button>
              <button type="submit"
              className="btn btn-default custom-btn-green">Add New Property</button>
            </div>
          </div>
          </form>
        </div>
      </div>
    )
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // renders the form
  RenderForm() {
    // Generate countries
    this.countries = config.countries.map ( (country, i) => {
      return (<option key={i} value={country}>{country}</option>)
    })

    return(
      <div className="row">
        <div className="clearfix"></div>
        <h3 className="col-md-12 col-sm-12 col-xs-12">Basic Settings</h3>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property Name*</label>
          <input type="text" required="required"
          onChange={this.handleChange('name')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property Email*</label>
          <input type="text" required="required"
          onChange={this.handleChange('email')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property Phone*</label>
          <input type="text" required="required"
          onChange={this.handleChange('phone')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property Fax</label>
          <input type="text"
          onChange={this.handleChange('fax')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property Country*</label>
            <select onChange={this.handleChange('country')}
            className="form-control" required="required">
              <option>Select</option>
              {this.countries}
            </select>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property City*</label>
          <input type="text" required="required"
          onChange={this.handleChange('city')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property Address*</label>
          <input type="text" required="required"
          onChange={this.handleChange('address')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property Zip*</label>
          <input type="text" required="required"
          onChange={this.handleChange('zip')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Longitude</label>
          <input type="text"
          onChange={this.handleChange('longitude')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Latitude</label>
          <input type="text"
          onChange={this.handleChange('latitude')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Website Link</label>
          <input type="text"
          onChange={this.handleChange('website')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property Contact Person Name*</label>
          <input type="text" required="required"
          onChange={this.handleChange('ownerName')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property Contact Person Email</label>
          <input type="text" required="required"
          onChange={this.handleChange('ownerEmail')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Contact Person Phone</label>
          <input type="text"
          onChange={this.handleChange('ownerPhone')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Currency</label>
          <select onChange={this.handleChange('currency')}
          className="form-control" required="required">
            <option>Select</option>
            <option value="Euro">Euro</option>
            <option value="Pound">Pound</option>
            <option value="Turkish lira">Turkish lira</option>
            <option value="Norwegian Krone">Norwegian Krone</option>
            <option value="Bulgarian lev">Bulgarian lev</option>
          </select>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Property Type</label>
          <select
          onChange={this.handleChange('stars')}
          className="form-control"
          required="required">
            <option value="0">Select</option>
            <option value="7">Villa</option>
            <option value="6">Apartment</option>
            <option value="1">1 Star Hotel</option>
            <option value="2">2 Stars Hotel</option>
            <option value="3">3 Stars Hotel</option>
            <option value="4">4 Stars Hotel</option>
            <option value="5">5 Stars Hotel</option>
          </select>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>What is considered infant for this property?</label>
          <select onChange={this.handleChange('considerInfant')}
          className="form-control" required="required">
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
          <select onChange={this.handleChange('roomOnly')}
          className="form-control" required="required">
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>


        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Supports All Inclusive?</label>
          <select onChange={this.handleChange('allInclusive')}
          className="form-control" required="required">
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Supports Full Board?</label>
          <select onChange={this.handleChange('fullBoard')}
          className="form-control" required="required">
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Supports Half Board?</label>
          <select onChange={this.handleChange('halfBoard')}
          className="form-control" required="required">
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Supports Bed and Breakfast?</label>
          <select onChange={this.handleChange('bedAndBreakfast')}
          className="form-control" required="required">
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Supports Self Catering?</label>
          <select onChange={this.handleChange('selfCatering')}
          className="form-control" required="required">
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <br />
        <div className="clearfix"></div>
        <h3 className="col-md-12 col-sm-12 col-xs-12">Descriptions</h3>

        <div className="form-group col-md-12 col-sm-12 col-xs-12">
          <label>Property Short Description* (500 Characters)</label>
          <textarea type="text" required="required"
          onChange={this.handleChange('shortDescription')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-12 col-sm-12 col-xs-12">
          <label>Property Long Description* (1000 Characters)</label>
          <textarea type="text" rows="3" required="required"
          onChange={this.handleChange('longDescription')}
          className="form-control col-md-7 col-xs-12" />
        </div>


      </div>
    )
  }


}

export default AddProperty

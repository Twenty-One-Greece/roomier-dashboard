import React from 'react';
import axios from 'axios';
import config from '../../../sharedFiles/Config.jsx';

class AddOwnAmenity extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // all data will be stored here before sent to the server
    this.form = {};

    // bind the functions to this
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  // ---------------------------------------------------------------------------
  // handle form change and pass it to the state so as to send it to the server
  handleChange(key) {
    return (e) => {
      this.form[key] = e.target.value;
    };
  }

  // ---------------------------------------------------------------------------
  // when the user submits the new amenity
  onSubmit(e) {
    e.preventDefault();
    // get user credentials
    const token = window.localStorage.token;
    const userID = window.localStorage.id;
    const propertyID = this.props.propertyID;
    const roomTypeID = this.props.roomTypeID;
    // format the data from the form
    this.form.userID = userID;
    this.form.type = 2;
    this.form.propertyID = propertyID;
    this.form.roomTypeID = roomTypeID;

    axios({

      method: 'post',
      url: config.dashboardAPI + '/user/' + userID + '/properties/' +
      propertyID + '/roomTypes/' + roomTypeID + '/amenities/new',
      headers: config.headers(token),
      data: this.form

    }).then((response) => {

      $('#AddAmenity').modal('hide');
      this.props.handleResponse(response);

    }).catch((error) => console.log(error));
  }

  // ---------------------------------------------------------------------------
  // renders html
  render() {
    return(
      <div className="modal fade" id="AddAmenity" tabIndex="-1" role="dialog"
      aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
        <form onSubmit={this.onSubmit}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">Add your own amenity </h4>
              <small>Required fields have a star (*)</small>
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                <label>Amenity Name*</label>
                  <input type="text" required="required"
                  placeholder="Amenity Name*"
                  onChange={this.handleChange('name')}
                  className="form-control col-md-7 col-xs-12" />
                </div>

                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                <label>Is this amenity paid?. &#160;</label>
                  <select type="radio" className="form-control" onChange={this.handleChange('extraCharge')}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-default"
              data-dismiss="modal">Close</button>

            <button type="submit" className="btn btn-success">Add Amenity</button>
            </div>

          </div>
          </form>
        </div>
      </div>
    )
  }

}

export default AddOwnAmenity

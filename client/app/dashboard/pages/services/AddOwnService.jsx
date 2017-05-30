import React from 'react';
import axios from 'axios';
import config from '../../../sharedFiles/Config.jsx';

class AddOwnService extends React.Component {
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


  // -----------------------------------------------
  // handle form change and pass it to the state so as to send it to the server
  handleChange(key) {
    return (e) => {
      this.form[key] = e.target.value;
    };
  }

  // -----------------------------------------------
  // when the user submits the new amenity
  onSubmit(e) {
    e.preventDefault();
    // get user credentials
    let token = window.localStorage.token;
    let userID = window.localStorage.id;
    let propertyID = this.props.propertyID;
    // format the data from the form
    this.form.userID = userID;
    this.form.propertyID = propertyID;

    axios({

      method: 'post',
      url: config.dashboardAPI + '/user/' + userID + '/properties/' + propertyID + '/services/new',
      headers: config.headers(token),
      data: this.form

    }).then((response) => {

      $('#AddAmenity').modal('hide');
      this.props.handleResponse(response);

    }).catch((error) => $.notify(response.data.message, 'error'));
  }

  // -----------------------------------------------
  // renders html
  render() {
    return(
      <div className="modal fade" id="AddService" tabIndex="-1"
      role="dialog" aria-labelledby="myModalLabel">
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
                  <input type="text" required="required" placeholder="Service Name*"
                  onChange={this.handleChange('name')} className="form-control col-md-7 col-xs-12" />
                </div>

                <div className="form-group col-md-6 col-sm-6 col-xs-12">
                  <input type="number" placeholder="Service Price (can be left blank)"
                  onChange={this.handleChange('price')} className="form-control col-md-7 col-xs-12" />
                </div>
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-success">Add Service</button>
            </div>
          </div>
          </form>
        </div>
      </div>
    )
  }


}

export default AddOwnService

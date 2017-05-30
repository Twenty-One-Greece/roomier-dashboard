import React from 'react';
import axios from 'axios';
import config from '../../../sharedFiles/Config.jsx';
import Alert from 'react-s-alert';

class AddRoomType extends React.Component {
  constructor(props) {
    super(props);
    // state
    this.state = {};
    // all data will be stored here before sent to the server
    this.form = {};

    // bind the functions to this
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.RenderForm = this.RenderForm.bind(this);
  }

  // ---------------------------------------------------------------------------

  // handle form change and pass it to the state so as to send it to the server
  handleChange(key) {
    return  (e) => {
      this.form[key] = e.target.value;
    };
  }

  // ---------------------------------------------------------------------------

  // when the user submits the new property
  onSubmit(e) {
    e.preventDefault()
    const token = window.localStorage.token
    const userID = window.localStorage.id
    const headers =  { headers: config.headers(token) }
    const propertyID = this.props.propertyID
    const URL = config.dashboardAPI + '/user/' + userID + '/properties/' +
          propertyID + '/roomTypes/new'

    // format the data from the form
    this.form.userID = userID
    this.form.propertyID = propertyID
    const data = this.form

    axios.post(URL, data, headers).then((response) => {

      if (response.data.error === "noErrors") {
        Alert.success(response.data.message)
        $('#AddRoomType').modal('hide')
        this.props.getRoomTypes()

      } else Alert.error(response.data.message)

    }).catch((error) => $.notify(error, "error"))
  }

  // ---------------------------------------------------------------------------

  // renders html
  render() {
    return (
      <div className="modal fade"
      id="AddRoomType" tabIndex="-1" role="dialog"
      aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <form onSubmit={this.onSubmit}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close"
                data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">
                  Add new Room Type
                </h4>
                <small>Required fields have a star (*)</small>
              </div>
              <div className="modal-body">

                {this.RenderForm()}

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default"
                data-dismiss="modal">Close</button>

              <button type="submit" className="btn btn-success">
                Add Room Type</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // -----------------------------------------------
  // renders the form
  RenderForm() {
    return (
      <div className="row">

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Room Type Name*</label>
          <input type="text" required="required"
          value={this.state.name}
          onChange={this.handleChange('name')}
          className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Room Type Size</label>
          <input type="number"
          value={this.state.size}
          onChange={this.handleChange('size')}
          className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Maximum PAX*</label>
          <input type="number" required="required"
          value={this.state.maxPax}
          onChange={this.handleChange('maxPax')}
          className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Base Occupancy*</label>
          <input type="number" required="required"
          value={this.state.baseOccupancy}
          onChange={this.handleChange('baseOccupancy')}
          className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Maximum Adult*</label>
          <input type="number" required="required"
          value={this.state.maxAdults}
          onChange={this.handleChange('maxAdults')}
          className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Maximum Children*</label>
          <input type="number" required="required"
          value={this.state.maxChildren}
          onChange={this.handleChange('maxChildren')}
          className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Maximum Infants*</label>
          <input type="number" required="required"
          value={this.state.maxInfants}
          onChange={this.handleChange('maxInfants')}
          className="form-control col-md-7 col-xs-12"/>
        </div>

        <div className="form-group col-md-12 col-sm-12 col-xs-12">
          <label>Room Type Description*</label>
          <textarea type="text" rows="3" required="required"
          value={this.state.description}
          onChange={this.handleChange('description')}
          className="form-control col-md-7 col-xs-12"/>
        </div>

      </div>
    )
  }


}

export default AddRoomType

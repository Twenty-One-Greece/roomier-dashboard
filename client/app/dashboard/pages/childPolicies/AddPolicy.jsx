import React from 'react';
import axios from 'axios';

import config from '../../../sharedFiles/Config.jsx';

class AddPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.form = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // handle form change and pass it to the state so as to send it to the server
  handleChange(key) {
    return (e) => {
      this.form[key] = e.target.value;
    };
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // submit data to server
  handleSubmit() {
    const token = window.localStorage.token;
    const userID = window.localStorage.id;
    const propertyID = this.props.propertyID;
    const roomTypeID = this.props.roomTypeID;
    // format the data from the form
    this.form.userID = userID;
    this.form.roomTypeID = roomTypeID;
    this.form.propertyID = propertyID;

    axios({
      method: 'post',
      url: config.dashboardAPI + '/user/' + userID + '/properties/' +
      propertyID + '/childPolicies/new',
      headers: config.headers(token),
      data: this.form
    })

    .then((response) => this.props.handleResponse(response))
    .catch((error) => $.notify(error, 'error'));
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // render html
  render() {
    return (
      <div className="row">
        <div className="col-xs-12">

          <h2>Child age groups</h2><br />

          Child up to

          <input type="number" required="required" placeholder="Age"
          onChange={this.handleChange('age')} className="days" />

          will be considered an age group <br /><br />

          <button type="button" onClick={this.handleSubmit}
           className="btn btn-success">Add Child Policy</button>

        </div>
      </div>
    )
  }

}

export default AddPolicy;

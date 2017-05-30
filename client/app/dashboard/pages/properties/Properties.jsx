import React from 'react';
import axios from 'axios';
import Alert from 'react-s-alert';

import config from '../../../sharedFiles/Config.jsx';
import BackButton from '../../components/BackButton.jsx';
import PropertyInfo from './PropertyInfo.jsx';
import TableHead from './TableHead.jsx';
import AddProperty from './AddProperty.jsx';
import Images from './Images.jsx';

class Properties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      propertyID: "undefined",
      searchText: null
    };

    this.getProperties = this.getProperties.bind(this);
    this.handleText = this.handleText.bind(this);

  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Before the component mount ask server for all properties
  componentWillMount() { this.getProperties() }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // get all the properties.
  getProperties() {
    const userID = window.localStorage.getItem('id');
    const token = window.localStorage.getItem('token');
    const URL = config.dashboardAPI + '/user/' + userID + '/properties'
    const headers = { headers: config.headers(token) }

    // Call server
    return axios.get (URL, headers).then((response) => {

      const { error, message, properties } = response.data
      if (error === 'noErrors') this.setState({properties: properties});
      else Alert.error(message)

    }).catch((error) => console.log(error));
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  handleText(e) { this.setState({searchText: e.target.value}) }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {

    // map each property to the property component
    this.list = this.state.properties.map( (property) => {
      return <PropertyInfo
                key={property.id}
                property={property}
                searchText={this.state.searchText}
                showEditModal={this.showEditModal}/>
      });

    return (
    <div className="row">
      <div className="col-xs-12 breadcump">Properties</div>
      <div className="col-xs-12">
        <div className="x_panel">
          <div className="x_title">
            <div className="form-group col-md-3 col-sm-3 col-xs-4">
              <input type="text" required="required"
              placeholder="Search Properties"
              onChange={this.handleText}
              className="form-control col-md-7 col-xs-12" />
            </div>
            <ul className="nav navbar-right panel_toolbox">
              <li><a className="btn btn-success custom-btn-action"
                   data-toggle="modal"
                   data-target="#AddProperty">
                  <i className="fa fa-plus"></i> Add New Property
                </a></li>
            </ul><div className="clearfix"></div>
          </div>
          <div className="x_content">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Subcategories</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.list}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div><AddProperty getProperties={this.getProperties}/></div>
    </div>
    )
  }
}

export default Properties;

import React from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import BackButton from '../../components/BackButton.jsx';
import { observer } from 'mobx-react';
import store_Property from '../../Stores/Store_Property.js';

import Property from './Property.jsx'
@observer
class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: null
    }
    this.handleText = this.handleText.bind(this);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  componentWillMount() {
    // Get all properties
    store_Property.getAllProperties();
  }
  
  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  handleText(e) { this.setState({searchText: e.target.value}) }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    const { properties } = store_Property;
    this.properties = properties.map( (property) => {
      return <Property property = {property}
                       key={property.id}
                       searchText={this.state.searchText} />
    })

    return(
      <div className="row">
        <div className="col-xs-12 breadcump">
          Calendar
        </div>
        <div className="col-xs-12">
          <div className="x_panel">
            <div className="x_title">
              <BackButton />
              <div className="clearfix"></div>
            </div>
            <div className="x_content">
              <div className="row">
                <div className="col-sm-6">
                  <small className="hint">Select property to show calendar</small>
                  <br /><br />
                  <input type="text" required="required"
                  placeholder="Search Properties"
                  onChange={this.handleText}
                  className="form-control col-md-7 col-xs-12" />
                    <ul className="list-unstyled timeline">
                      {this.properties}
                    </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Calendar

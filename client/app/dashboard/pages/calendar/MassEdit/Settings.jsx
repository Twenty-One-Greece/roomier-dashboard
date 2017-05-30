import React from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';

@observer
class Settings
 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // handle form change and pass it to the state so as to send it to the server
  handleChange(key) {
    return (e) => {
      let { store_SpecialDates } = this.props;
      store_SpecialDates.dates[key] = e.target.value;
     }
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    return(
      <div className="col-md-12 col-sm-12 col-xs-12">
      <h2>Settings </h2>

        <div className="form-group col-md-2 col-sm-2 col-xs-6">
          <label>Alotment</label>
          <input type="number" required="required"
          onChange={this.handleChange('alotment')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-2 col-sm-2 col-xs-6">
          <label>Price</label>
          <input type="number" required="required"
          onChange={this.handleChange('basePlanPrice')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-2 col-sm-2 col-xs-6">
          <label>Release</label>
          <input type="number" required="required"
          onChange={this.handleChange('releaseRoom')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-2 col-sm-2 col-xs-6">
          <label>Minimum Stay</label>
          <input type="number" required="required"
          onChange={this.handleChange('minimumStay')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-2 col-sm-2 col-xs-6">
          <label>Check In Disallowed</label>
          <select
          onChange={this.handleChange('checkInDisallowed')}
          className="form-control" required="required">
            <option value="1">No</option>
            <option value="0">Yes</option>
          </select>
        </div>

        <div className="form-group col-md-2 col-sm-2 col-xs-6">
          <label>Stop Sales</label>
          <select
          onChange={this.handleChange('stopSales')}
          className="form-control" required="required">
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

      </div>
    )
  }

}

export default Settings

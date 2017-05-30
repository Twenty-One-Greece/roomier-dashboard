import React from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';

var DatePicker = require('react-datepicker');
var moment = require('moment');


@observer
class Dates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      toDate: moment()
    }

    this.handleChange = this.handleChange.bind(this);
  }


  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  handleChange(key, date) {
    return (date) => {
      let { dates } = this.props.store_SpecialDates;
      dates[key] = date.format('YYYY-MM-DD')
      this.setState({[key]: date})
     }
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render(){
    const { date, toDate } = this.state

    return(
      <div>
      <h2>Dates</h2>

      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Booking date: start* </label><br />
          <DatePicker
              className = {"form-control col-md-7 col-xs-12"}
              dateFormat = {'YYYY-MM-DD'}
              selected = {date}
              onChange = {this.handleChange('date')} />
      </div>

      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Booking date: end* </label><br />
          <DatePicker
              minDate = {date}
              className = {"form-control col-md-7 col-xs-12"}
              dateFormat = {'YYYY-MM-DD'}
              selected = {toDate}
              onChange = {this.handleChange('toDate')} />
      </div>

      </div>
    )
  }

}

// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
export default Dates

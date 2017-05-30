import React from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';

var DatePicker = require('react-datepicker');
var moment = require('moment');
require('react-datepicker/dist/react-datepicker.css');


@observer
class Dates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.dates = {
			bookingDateStart: null,
			bookingDateEnd: null,
			stayDateStart: null,
			stayDateEnd: null
		};

    this.handleChange = this.handleChange.bind(this);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  handleChange(key, date) {
    const { store_NewOffer } = this.props;

    return (date) => {
      this.dates[key] = moment(date);
      this.setState({date: key});

      store_NewOffer.dates[this.props.index] = this.dates;
    }
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render(){
    return(
      <div>
      <h2>Dates {this.props.index + 1}</h2>

      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Booking date: start* </label><br />
          <DatePicker
              className = {"form-control col-md-7 col-xs-12"}
              dateFormat = {'YYYY-MM-DD'}
              selected = {this.dates.bookingDateStart}
              onChange = {this.handleChange('bookingDateStart')} />
      </div>

      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Booking date: end* </label><br />
          <DatePicker
              minDate = {this.dates.bookingDateStart}
              className = {"form-control col-md-7 col-xs-12"}
              dateFormat = {'YYYY-MM-DD'}
              selected = {this.dates.bookingDateEnd}
              onChange = {this.handleChange('bookingDateEnd')} />
      </div>

      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Stay date: start* </label><br />
          <DatePicker
              className = {"form-control col-md-7 col-xs-12"}
              dateFormat = {'YYYY-MM-DD'}
              selected = {this.dates.stayDateStart}
              onChange = {this.handleChange('stayDateStart')} />
      </div>

      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Stay date: end* </label><br />
          <DatePicker
              minDate = {this.dates.stayDateStart}
              className = {"form-control col-md-7 col-xs-12"}
              dateFormat = {'YYYY-MM-DD'}
              selected = {this.dates.stayDateEnd}
              onChange = {this.handleChange('stayDateEnd')} />
      </div>

      </div>
    )
  }

}

export default Dates

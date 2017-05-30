import React from 'react';
import axios from 'axios';
import moment from 'moment'
import DatePicker from 'react-datepicker';
import { observer } from 'mobx-react';

@observer
class SelectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeDates = this.handleChangeDates.bind(this);
    this.handleChangeProperty = this.handleChangeProperty.bind(this);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // when component mounts get the properties names and ids.
  // to be used later for builing the select property button
  componentWillMount() {
    const { store_Calendar } = this.props;
    store_Calendar.getProperties();
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // handles dates change and puts data to the store
  handleChangeDates(key, date) {
    const { store_Calendar } = this.props;
    return (date) => store_Calendar.data[key] = date;
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // handles select button change and puts data to the store
  handleChangeProperty(e) {
    const { store_Calendar } = this.props;
    store_Calendar.data.propertyID = parseInt(e.target.value);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // submits the data saved on the store to get the calendar info
  onSubmit(){
    const { store_Calendar } = this.props;
    store_Calendar.getCalendar()
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // renders the component and makes the select button from the
  // properties requested got earlier
  render(){
    const { store_Calendar } = this.props;
    // make the propesty select button
    this.options = store_Calendar.properties.map( (property) => {
      return <option
              key={property.id}
              value={property.id}>
              {property.name}</option>
    })
    return(
      <div>
        <div className="form-group col-md-3 col-sm-3 col-xs-3">
          <label>From:</label><br />
            <DatePicker
              maxDate = {store_Calendar.data.endDate}
              className = {"form-control col-md-7 col-xs-12"}
              dateFormat = {'YYYY-MM-DD'}
              selected = {store_Calendar.data.startDate}
              onChange = {this.handleChangeDates('startDate')}/>
        </div>

        <div className="form-group col-md-3 col-sm-3 col-xs-3">
          <label>To: </label><br />
            <DatePicker
              minDate = {store_Calendar.data.startDate}
              className = {"form-control col-md-7 col-xs-12"}
              dateFormat = {'YYYY-MM-DD'}
              selected = {store_Calendar.data.endDate}
              onChange = {this.handleChangeDates('endDate')}/>
        </div>

        <div className="form-group col-md-3 col-sm-3 col-xs-3">
          <label>Property:</label>
          <select
          onChange={this.handleChangeProperty}
          className="form-control" required="required">
            {this.options}
          </select>
        </div>

        <div className="form-group col-md-3 col-sm-3 col-xs-3">
          <label>&nbsp;</label>
          <div className="clearfix"></div>
          <button type="button" onClick={this.onSubmit}
          className="btn btn-success">Show Rates
          </button>
        </div>
      </div>
    )
  }
}

//＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

export default SelectForm

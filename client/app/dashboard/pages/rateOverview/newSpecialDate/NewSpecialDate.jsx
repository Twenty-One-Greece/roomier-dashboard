import React from 'react';
import moment from 'moment'
import { observer } from 'mobx-react';
import DatePicker from 'react-datepicker';
import BackButton from '../../../components/BackButton.jsx';
import store_NewSpecialDate from './Store_NewSpecialDate.js';

@observer
class NewSpecialDate extends React.Component {
  constructor(props) {
    super(props);
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // When the component mounts the date of
  // the store becomes the date of the params
  componentWillMount() {
    store_NewSpecialDate.data.date = this.props.params.date;
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // handles dates change and puts data to the store
  handleChangeDate(date) {
    const { data } = store_NewSpecialDate;
    data.date = date.format("YYYY-MM-DD");
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // handles inpouts change and puts data to the store
  handleChangeInput(key) {
    return (e) => store_NewSpecialDate.data[key] = e.target.value;
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // submits the data saved on the store to get the calendar info
  onSubmit(rateID, propertyID){
    store_NewSpecialDate.submitData(rateID, propertyID)
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    const { rateID, date, propertyID } = this.props.params;
    const { data } = store_NewSpecialDate
    const newDate = moment(data.date);

    return(
      <div className="row">
        <div className="col-xs-12">
          <div className="x_panel">
            <div className="x_title">
              <BackButton />
              <h2 className="pageHeader">
              Now editing: {newDate.format("dddd, MMMM Do YYYY")}</h2>
              <div className="clearfix"></div>
            </div>
            <div className="x_content">

              <div className="form-group col-md-3 col-sm-3 col-xs-5">
                <label>Date:</label><br />
                  <DatePicker
                    className = {"form-control col-md-7 col-xs-12"}
                    dateFormat = {'YYYY-MM-DD'}
                    selected = {moment(data.date)}
                    onChange={this.handleChangeDate}/>
              </div>

              <div className="form-group col-md-3 col-sm-3 col-xs-5">
                <label>Alotment</label>
                <input type="text" required="required"
                className="form-control col-md-7 col-xs-12"
                onChange={this.handleChangeInput('alotment')} />
              </div>

              <div className='clearfix'> </div> <br/>

              <div className="form-group col-md-3 col-sm-3 col-xs-5">
                <label>BasePlanPrice</label>
                <input type="text" required="required"
                className="form-control col-md-7 col-xs-12"
                onChange={this.handleChangeInput('basePlanPrice')} />
              </div>

              <div className="form-group col-md-3 col-sm-3 col-xs-5">
                <label>MinimumStay</label>
                <input type="text" required="required"
                className="form-control col-md-7 col-xs-12"
                onChange={this.handleChangeInput('minimumStay')} />
              </div>

              <div className='clearfix'></div> <br/>

              <div className="form-group col-md-3 col-sm-3 col-xs-3">
                <label>&nbsp;</label>
                <div className="clearfix"></div>
                <button type="button"
                onClick={() => this.onSubmit(rateID, propertyID)}
                className="btn btn-primary">Save
                </button>
              </div>


            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewSpecialDate

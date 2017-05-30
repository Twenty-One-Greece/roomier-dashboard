import React from 'react';
import moment from 'moment'
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import Settings from './Settings.jsx'
import store_SpecialDates from './Store_SpecialDates.js'
import BackButton from '../../../components/BackButton.jsx';

@observer
class EditDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onSubmit = this.onSubmit.bind(this);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  onSubmit() {
    const { propertyID, roomTypeID, date } = this.props.params
    store_SpecialDates.addDate(propertyID, roomTypeID, date)
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    const { propertyID, date } = this.props.params
    const formatDate = moment(date).format('ddd, Do MM YYYY')

    return (
      <div className="row">
        <div className="col-xs-12 breadcump">
          Calendar / Property ID: {this.props.params.propertyID} /
          Room Type ID: {this.props.params.roomTypeID} /
          Date: {this.props.params.date}
        </div>
        <div className="col-xs-12">
          <div className="x_panel">
            <div className="x_title">
              <BackButton />
              <div className="clearfix"></div>
            </div>
            <div className="x_content">

              <Settings store_SpecialDates={store_SpecialDates}/>

              <div className="clearfix"></div>

              <button type="button" onClick={this.onSubmit}
              className="btn btn-default custom-btn-green">Save
              </button>

            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default EditDate

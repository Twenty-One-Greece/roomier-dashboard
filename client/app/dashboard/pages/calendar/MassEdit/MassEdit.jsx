import React from 'react';
import moment from 'moment'
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import Dates from './Dates.jsx'
import Settings from './Settings.jsx'
import store_SpecialDates from './Store_SpecialDates.js'
import BackButton from '../../../components/BackButton.jsx';

@observer
class MassEdit extends React.Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this)
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  onSubmit() {
    const { propertyID, roomTypeID } = this.props.params
    store_SpecialDates.sendDataToServer(propertyID ,roomTypeID)
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    const { propertyID } = this.props.params

    return (
      <div className="row">
        <div className="col-xs-12 breadcump">
          Calendar / Property ID: {this.props.params.propertyID} /
          Room Type ID: {this.props.params.roomTypeID} / Mass Date Edit
        </div>
        <div className="col-xs-12">
          <div className="x_panel">
            <div className="x_title">
              <BackButton />
              <div className="clearfix"></div>
            </div>
            <div className="x_content">

              <Dates store_SpecialDates={store_SpecialDates}/>

              <div className="clearfix"></div>
              <br />

              <Settings store_SpecialDates={store_SpecialDates}/>

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

export default MassEdit

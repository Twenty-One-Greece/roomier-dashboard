import React from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import BackButton from '../../../components/BackButton.jsx';
import { observer } from 'mobx-react';
import store_NewOffer from './Store_NewOffer.js';

import Dates from './Dates.jsx';
import Settings from './Settings.jsx';
import RoomTypes from './RoomTypes.jsx';

@observer
class NewOffer
 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datesIndex: 1
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.addDates = this.addDates.bind(this);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  componentWillMount() {
    store_NewOffer.getRoomNames(this.props.params.propertyID)
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  addDates(index) {
    if (index >= 5) $.notify('Up to 5 dates are allowed', "info")
    else this.setState({datesIndex: index + 1});
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  removeDates(index) {
    this.setState({datesIndex: index - 1});
    store_NewOffer.dates.splice(index - 1, 1);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  onSubmit() {
    store_NewOffer.postData(this.props.params.propertyID)
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    let dates = [];
    let display = "";

    this.list = store_NewOffer.roomTypes.map( (room, i) => {
      return <RoomTypes
                room = {room}
                index = {i}
                key = {room.id}
                store_NewOffer = {store_NewOffer} />
    })

    // make the dates part of the form dynamic
    for (var i = 0; i < this.state.datesIndex ; i++) {
      dates[i] = <Dates
                    key = {i}
                    store_NewOffer = {store_NewOffer}
                    index = {i} />
    }

    // dont display remove dates button if only one date
    if (this.state.datesIndex <= 1) display = 'none';

    return(
      <div className="row">
        <div className="col-xs-12 breadcump">
          Property ID:{this.props.params.propertyID} / Special Offers / New offer
        </div>
        <div className="col-xs-12">
          <div className="x_panel">
            <div className="x_title">
              <BackButton />
              <div className="clearfix"></div>
            </div>
            <div className="x_content">

              {dates}

              <br />
              <button type="button"
              onClick={() => this.addDates(this.state.datesIndex)}
              className="btn btn-default custom-btn-green">Add More Dates
              </button>

              <button type="button"
              style={ {display: display} }
              onClick={() => this.removeDates(this.state.datesIndex)}
              className="btn btn-default custom-btn-red">Remove Dates
              </button>
              <div className="clearfix"></div>
              <br />

              <Settings store_NewOffer = {store_NewOffer} />
              <div className="clearfix"></div>
              <br />

              {this.list}

              <div className="clearfix"></div>
              <br />

              <Link to={'dashboard/properties/'
              + this.props.params.propertyID + '/specialOffers/'}
              type="button" className="btn btn-default">Cancel
              </Link>

              <button type="button" onClick={this.onSubmit}
              className="btn btn-success">Add Special Offer
              </button>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewOffer

import React from 'react';
import moment from 'moment';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { render } from 'react-dom';
import { observer } from 'mobx-react';
var DatePicker = require('react-datepicker');

import Wiz_DatesRendered from "./Wiz_DatesRendered.jsx"

@observer
class Wiz_Dates extends React.Component {
  constructor(props) {
    super(props);

    this.addDates = this.addDates.bind(this)
    this.removeDates = this.removeDates.bind(this)

  }


  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  addDates(){
    const {store_NewRate} = this.props
    store_NewRate.numOfDates++
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  removeDates(){
    const {store_NewRate} = this.props
    store_NewRate.numOfDates--
    store_NewRate.dates.splice(store_NewRate.numOfDates, 1)
  }


  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // render Component
  render(){
    const {store_NewRate} = this.props
    let dates = []
    let display = ""

    if (store_NewRate.numOfDates <= 1) display = 'none'

    // Rendre dates
    for (var i = 0; i < store_NewRate.numOfDates; i++) {
      dates.push(<Wiz_DatesRendered key={i} index={i}
        store_NewRate={this.props.store_NewRate}/>)
    }

    return(
      <div className="row">
        <p className="col-xs-12 hint">In this dialog you can add the dates the rates starts and finishes (can be changed later).</p>
        <p className="col-xs-12 hint">In the next dialog you can set up the rate details (prices, meals, etc).</p>
        <p className="col-xs-12 hint">Lastly in the third dialog you can set up child fees for this new rate according to the child groups you have created.</p>

        <div className="clearfix"></div><br />

        {dates}

        <div className="clearfix"></div><br />
        <div className="form-group col-md-6 col-sm-6 col-xs-6">
          <button className="btn btn-default custom-btn-green"
          onClick={this.addDates}>Add More Dates </button>

          <button style={{display: display}}
          className="btn btn-default custom-btn-red"
          onClick={this.removeDates}>Remove Dates </button>
        </div>
      </div>
    )
  }

  // ---------------------------------------------------------------------------


}

export default Wiz_Dates

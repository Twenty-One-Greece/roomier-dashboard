import React from 'react';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import BackButton from '../../components/BackButton.jsx';
import SelectForm from './SelectForm.jsx';
import Content from './Content.jsx';
import { observer } from 'mobx-react';
import store_Calendar from './Store_Calendar.js';

@observer
class RateOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getCalendar(propertyID) {
    store_Calendar.getCalendar(propertyID)
  }

  render(){
    return(
      <div className="row">
        <div className="col-xs-12 breadcump">
          Rate Overview
        </div>
        <div className="col-xs-12">
          <div className="x_panel">
            <div className="x_title">
              <BackButton />
              <div className="clearfix"></div>
            </div>
            <div className="x_content">

              <SelectForm store_Calendar = {store_Calendar}/>

              <div className='clearfix'></div> <br /><br />

              <Content store_Calendar = {store_Calendar}/>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RateOverview

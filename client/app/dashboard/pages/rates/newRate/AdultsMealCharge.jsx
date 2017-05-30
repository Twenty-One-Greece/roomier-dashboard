import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import { observer } from 'mobx-react';

import config from '../../../../sharedFiles/Config.jsx';
import store_Property from '../../../Stores/Store_Property.js';

@observer
class AdultsMealCharge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

 //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
 
 // get property data to check which meal plans are supported
  componentWillMount() {
    store_Property.getProperty(this.props.propertyID);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  
  // render component after checking supported meal plans
  render() {
    const { property } = store_Property;
    const { basePlan } = this.props;

    let aiDisplay, fbDisplay, hbDisplay = {};
    let bnbDisplay, scDisplay ,roDisplay = {};

    // user only needs to see the meals his property is offering
    // if the base plan is one of these ne need to include again
    if (basePlan == 1 || property.allInclusive === 0)
     aiDisplay = {display: 'none'};
    if (basePlan == 2 || property.fullBoard === 0)
     fbDisplay = {display: 'none'};
    if (basePlan == 3 || property.halfBoard === 0)
     hbDisplay = {display: 'none'};
    if (basePlan == 4 || property.bedAndBreakfast === 0)
     bnbDisplay = {display: 'none'};
    if (basePlan == 5 || property.selfCatering === 0)
     scDisplay = {display: 'none'};
    if (basePlan == 6 || property.roomOnly === 0)
     roDisplay = {display: 'none'};


    if (this.props.basePlan === null) return (null)
    else return (
      <div>
        <div className="form-group col-md-6 col-sm-6 col-xs-12"
        style = { aiDisplay }>
          <label>All Inclusive (adults)</label>
          <input type="number" required="required"
          onChange={this.props.handleChange('allInclusive')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12"
        style = { aiDisplay }>
          <label>All Inclusive (ExtraPax)</label>
          <input type="number" required="required"
          onChange={this.props.handleChange('epcAllInclusive')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12"
        style = { fbDisplay }>
          <label>Full Board (adults)</label>
          <input type="number" required="required"
          onChange={this.props.handleChange('fullBoard')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12"
        style = { fbDisplay }>
          <label>Full Board (Extra Pax)</label>
          <input type="number" required="required"
          onChange={this.props.handleChange('epcFullBoard')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12"
        style = { hbDisplay }>
          <label>Half Board (adults)</label>
          <input type="number" required="required"
          onChange={this.props.handleChange('halfBoard')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12"
        style = { hbDisplay }>
          <label>Half Board (Extra Pax)</label>
          <input type="number" required="required"
          onChange={this.props.handleChange('epcHalfBoard')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12"
        style = { bnbDisplay }>
          <label>Bed and Breakfast (adults)</label>
          <input type="number" required="required"
          onChange={this.props.handleChange('bedAndBreakfast')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12"
        style = { bnbDisplay }>
          <label>Bed and Breakfast (Extra Pax)</label>
          <input type="number" required="required"
          onChange={this.props.handleChange('epcBedAndBreakfast')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12"
        style = { scDisplay }>
          <label>Self Catering (adults)</label>
          <input type="number" required="required"
          onChange={this.props.handleChange('selfCatering')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12"
        style = { scDisplay }>
          <label>Self Catering (Extra Pax)</label>
          <input type="number" required="required"
          onChange={this.props.handleChange('epcSelfCatering')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12"
        style = { roDisplay }>
          <label>Rooom Only (adults)</label>
          <input type="number" required="required"
          onChange={this.props.handleChange('roomOnly')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12"
        style = { roDisplay }>
          <label>Rooom Only (Extra Pax)</label>
          <input type="number" required="required"
          onChange={this.props.handleChange('epcRoomOnly')}
          className="form-control col-md-7 col-xs-12" />
        </div>
      </div>
    )
  }

}


export default AdultsMealCharge

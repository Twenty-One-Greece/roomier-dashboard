import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import { observer } from 'mobx-react';

import config from '../../../../sharedFiles/Config.jsx';
import AdultsMealCharge from './AdultsMealCharge.jsx';

@observer
class Wiz_Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basePlan: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.selectMealPlan = this.selectMealPlan.bind(this)
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  componentWillMount() {
    const { store_NewRate, roomTypeID, propertyID } = this.props
    store_NewRate.getBaseOccupancy(propertyID, roomTypeID)
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Handle form change
  handleChange(key) {
    return (e) => {
      if (key === 'basePlan') this.selectMealPlan(e)
      const { store_NewRate } = this.props
      store_NewRate.rateInfo[key] = e.target.value
     }
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Set State with the selected meal plan so that the form updates dynamicaly
  selectMealPlan(e){
    const { store_NewRate } = this.props
    store_NewRate.basePlan = e.target.value
    this.setState({basePlan: e.target.value})
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    const { store_NewRate } = this.props
    const baseOccupancy = store_NewRate.baseOccupancy
    let singleUse = null

    if (baseOccupancy === 2) singleUse = (
      <div className="form-group col-md-6 col-sm-6 col-xs-12">
        <label>Single Use Price</label>
        <input type="number" required="required"
        onChange={this.handleChange('singleUsePrice')}
        className="form-control col-md-7 col-xs-12" />
      </div>
    )

    return(
      <div className="row">
        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Rate Name*</label>
          <input type="text" required="required"
          onChange={this.handleChange('name')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Base Meal Plan</label>
          <select
          onChange={this.handleChange('basePlan')}
          className="form-control" required="required">
            <option>Select</option>
            <option value="1">All Inclusive</option>
            <option value="2">Full Board</option>
            <option value="3">Half Board</option>
            <option value="4">Bed & Breakfast</option>
            <option value="5">Self Catering</option>
            <option value="6">Room Only</option>
          </select>
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Price with base meal plan* (Base occupancy: {baseOccupancy})</label>
          <input type="number" required="required"
          onChange={this.handleChange('basePlanPrice')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        {singleUse}

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Extra Pax Charge*</label>
          <input type="number" required="required"
          onChange={this.handleChange('extraPaxCharge')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="clearfix"></div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Allotment*</label>
          <input type="number" required="required"
          onChange={this.handleChange('alotment')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Release</label>
          <input type="number" required="required"
          onChange={this.handleChange('releaseRoom')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-12">
          <label>Minimum Stay*</label>
          <input type="number" required="required"
          onChange={this.handleChange('minimumStay')}
          className="form-control col-md-7 col-xs-12" />
        </div>

        <div className="clearfix"></div>
        <br />

        <AdultsMealCharge
            propertyID = { this.props.propertyID }
            basePlan = { this.state.basePlan }
            handleChange = { this.handleChange }
            />

      </div>
    )
  }

}

export default Wiz_Settings

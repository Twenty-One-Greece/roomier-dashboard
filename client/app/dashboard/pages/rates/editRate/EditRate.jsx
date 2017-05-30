import React                      from 'react'
import axios                      from 'axios'
import moment                     from 'moment'
import { Link }                   from 'react-router'
import { render }                 from 'react-dom'
import DatePicker                 from 'react-datepicker'
import config                     from '../../../../sharedFiles/Config.jsx'
import BackButton                 from '../../../components/BackButton.jsx'
import store_EditRate             from './Store_EditRate.js'
import { observer }               from 'mobx-react'
import Policy                     from './Policy.jsx' 

@observer
class EditRate extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange             = this.handleChange.bind(this)
    this.handleStartDate          = this.handleStartDate.bind(this)
    this.handleEndDate            = this.handleEndDate.bind(this)
    this.onSubmit                 = this.onSubmit.bind(this)
    this.RenderForm               = this.RenderForm.bind(this)
    this.renderAllInclusive       = this.renderAllInclusive.bind(this)
    this.renderFullBoard          = this.renderFullBoard.bind(this)
    this.renderHalfBoard          = this.renderHalfBoard.bind(this)
    this.renderBedAndBreakfast    = this.renderBedAndBreakfast.bind(this)
    this.renderSelfCatering       = this.renderSelfCatering.bind(this)
    this.renderRoomOnly           = this.renderRoomOnly.bind(this)
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  componentWillMount(){
    const propertyID              = this.props.params.propertyID
    const roomTypeID              = this.props.params.roomTypeID
    const rateID                  = this.props.params.rateID

    store_EditRate.getRate(propertyID, roomTypeID, rateID)
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  handleChange(key) {
    return (e) => store_EditRate.rate[key] = e.target.value
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Set new values in rate.startDate
  handleStartDate(date) {
    store_EditRate.startDate        = date
    store_EditRate.rate.startDate   = moment(date).format('YYYY-MM-DD')
   }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Set new values in rate.endDate
  handleEndDate(date) {
    store_EditRate.endDate           = date
    store_EditRate.rate.endDate      = moment(date).format('YYYY-MM-DD')
   }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  onSubmit() {
    const propertyID                  = this.props.params.propertyID
    const roomTypeID                  = this.props.params.roomTypeID
    const rateID                      = this.props.params.rateID

    store_EditRate.submitData(propertyID, roomTypeID, rateID)
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    const { rate, childPolicies, startDate, endDate } = store_EditRate

    this.policies = childPolicies.map((policy, i) => {
      return <Policy key={policy.id} index={i} policy={policy} rate={rate} store_EditRate={store_EditRate}/>
    })


    return(
    <div className="row">
      <div className="col-xs-12 breadcump">Property ID:{this.props.params.propertyID} / Room Type ID: {this.props.params.roomTypeID} / Rate ID: {this.props.params.rateID} / Edit</div>
      <div className="col-xs-12">
        <div className="x_panel">
          <div className="x_title"><BackButton /><div className="clearfix"></div></div>
          <div className="x_content">{this.RenderForm(rate, startDate, endDate)}</div>
          <div className="x_content">
            <div className="row"><h2>Child Policies</h2>{this.policies}</div>
          </div>
          <Link to={'dashboard/properties/' + this.props.params.propertyID + '/roomTypes/' + this.props.params.roomTypeID + '/rates'} type="button" className="btn btn-default">Cancel</Link>
          <button type="button" onClick={this.onSubmit} className="btn btn-success">Save</button>
        </div>
      </div>
    </div>
    )
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Renders the form
  RenderForm(rate, startDate, endDate) {
    let singleUsePrice = null

    return(
    <div className="row">

      <h2>Rate Basic Settings</h2>
      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Rate Start Date</label><br />
          <DatePicker
              maxDate     = {endDate}
              className   = {"form-control col-md-7 col-xs-12"}
              dateFormat  = {'YYYY-MM-DD'}
              selected    = {startDate}
              onChange    = {this.handleStartDate} />
      </div>

      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Rate End Date</label><br />
          <DatePicker
              minDate     = {startDate}
              className   = {"form-control col-md-7 col-xs-12"}
              dateFormat  = {'YYYY-MM-DD'}
              selected    = {endDate}
              onChange    = {this.handleEndDate} />
      </div>

      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Rate Name</label>
        <input type="text" required="required"
        value      = {rate.name}
        onChange   = {this.handleChange('name')}
        className  = "form-control col-md-7 col-xs-12" />
      </div>

      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Release</label>
        <input type="number" required="required"
        value     = {rate.releaseRoom}
        onChange  = {this.handleChange('releaseRoom')}
        className = "form-control col-md-7 col-xs-12" />
      </div>

      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Allotment</label>
        <input type="number" required="required"
        value     = {rate.alotment}
        onChange  = {this.handleChange('alotment')}
        className = "form-control col-md-7 col-xs-12" />
      </div>

      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Extra Pax Charge</label>
        <input type="number" required="required"
        value     = {rate.extraPaxCharge}
        onChange  = {this.handleChange('extraPaxCharge')}
        className = "form-control col-md-7 col-xs-12" />
      </div>

      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Base Meal Plan</label>
        <select
        onChange={this.handleChange('basePlan')}
        value     = {rate.basePlan}
        className = "form-control" required="required">
          <option>Select</option>
          <option value="1">All Inclusive</option>
          <option value="2">Full Board</option>
          <option value="3">Half Board</option>
          <option value="4">Bed & Breakfast</option>
          <option value="5">Self Catering</option>
          <option value="6">Room Only</option>
        </select>
      </div>

      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Price with base meal plan</label>
        <input type="number" required="required"
        value     = {rate.basePlanPrice}
        onChange  = {this.handleChange('basePlanPrice')}
        className = "form-control col-md-7 col-xs-12" />
      </div>

      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Single Use Price</label>
        <input type="number"
        value     = {rate.singleUsePrice}
        onChange  = {this.handleChange('singleUsePrice')}
        className = "form-control col-md-7 col-xs-12" />
      </div>

      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Minimum Stay</label>
        <input type="number" required="required"
        value     = {rate.minimumStay}
        onChange  = {this.handleChange('minimumStay')}
        className = "form-control col-md-7 col-xs-12" />
      </div>

      <div className="clearfix"></div>

      <h2>Meal Plans Extra Charge</h2>

      {this.renderAllInclusive(rate)}
      {this.renderBedAndBreakfast(rate)}
      {this.renderFullBoard(rate)}
      {this.renderHalfBoard(rate)}
      {this.renderRoomOnly(rate)}
      {this.renderSelfCatering(rate)}
    </div>
    )
  }


  // All functions below are used to render meal plans
  renderAllInclusive(rate) {
    if ((rate.allInclusive || rate.allInclusive === "") && rate.basePlan != 1) return (
      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>All Inclusive</label>
        <input type="number" required="required"
        value       = {rate.allInclusive}
        onChange    = {this.handleChange('allInclusive')}
        className   = "form-control col-md-7 col-xs-12" />
      </div>
    )
  }

  renderHalfBoard(rate) {
    if ((rate.halfBoard || rate.halfBoard === "") && rate.basePlan != 3) return (
      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Half Board</label>
        <input type="number" required="required"
        value       = {rate.halfBoard}
        onChange    = {this.handleChange('halfBoard')}
        className   = "form-control col-md-7 col-xs-12" />
      </div>
    )
  }

  renderFullBoard(rate) {
    if ((rate.fullBoard || rate.fullBoard === "") && rate.basePlan != 2) return (
      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Full Board</label>
        <input type="number" required="required"
        value       = {rate.fullBoard}
        onChange    = {this.handleChange('fullBoard')}
        className   = "form-control col-md-7 col-xs-12" />
      </div>
    )
  }

  renderBedAndBreakfast(rate) {
    if ((rate.bedAndBreakfast || rate.bedAndBreakfast === "") && rate.basePlan != 4) return (
      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Bed And Breakfast</label>
        <input type="number" required="required"
        value       = {rate.bedAndBreakfast}
        onChange    = {this.handleChange('bedAndBreakfast')}
        className   = "form-control col-md-7 col-xs-12" />
      </div>
    )
  }

  renderSelfCatering(rate) {
    if ((rate.selfCatering || rate.selfCatering === "") && rate.basePlan != 5) return (
      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Self Catering</label>
        <input type="number" required="required"
        value       = {rate.selfCatering}
        onChange    = {this.handleChange('selfCatering')}
        className   = "form-control col-md-7 col-xs-12" />
      </div>
    )
  }

  renderRoomOnly(rate) {
    if ((rate.roomOnly || rate.roomOnly === "") && rate.basePlan != 6) return (
      <div className="form-group col-md-6 col-sm-6 col-xs-6">
        <label>Room Only</label>
        <input type="number" required="required"
        value       = {rate.roomOnly}
        onChange    = {this.handleChange('roomOnly')}
        className   = "form-control col-md-7 col-xs-12" />
      </div>
    )
  }

}

export default EditRate

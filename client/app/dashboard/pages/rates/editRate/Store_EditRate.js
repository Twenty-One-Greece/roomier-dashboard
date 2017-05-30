import { observable }            from 'mobx'
import axios                     from 'axios'
import { browserHistory }        from 'react-router'
import Alert                     from 'react-s-alert'
import config                    from '../../../../sharedFiles/Config.jsx'
import moment                    from 'moment'

class Store_EditRate {
  // Init rate values to avoid errors
  @observable rate            = {}
  @observable childPolicies   = []

  // Datepicker accepts null and moment
  @observable startDate       = null
  @observable endDate         = null

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Get rate data from server
  getRate(propertyID, roomTypeID, rateID) {
    const userID      = window.localStorage.id
    const token       = window.localStorage.token
    const headers     = {headers: config.headers(token)}
    const URL         = config.dashboardAPI + '/user/' + userID + '/properties/' + propertyID + '/roomTypes/' + roomTypeID + '/rates/' + rateID

    axios.get(URL, headers)
    
    .then( (response) => {
      const { err, message, rate, childPolicies } = response.data
      if (!err) {
        this.rate             = rate
        this.childPolicies    = childPolicies
        this.startDate        = moment(rate.startDate)
        this.endDate          = moment(rate.endDate)
      } else Alert.error(message)
    })
    
    .catch((error) => $.notify(error, "error"))
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Send data to server
  submitData(propertyID, roomTypeID, rateID) {
    const userID              = window.localStorage.id
    const token               = window.localStorage.token
    const headers             = {headers: config.headers(token)}
    const URLrate             = config.dashboardAPI + '/user/' + userID + '/properties/' + propertyID + '/roomTypes/' + roomTypeID + '/rates/' + rateID
    const URLchildPolicies    = config.dashboardAPI + '/user/' + userID + '/properties/' + propertyID + '/roomTypes/' + roomTypeID + '/childPolicies/' + rateID

    // Make values null according to base plan
    if (this.rate.basePlan === 1) this.rate.allInclusive     = null
    if (this.rate.basePlan === 2) this.rate.fullBoard        = null
    if (this.rate.basePlan === 3) this.rate.halfBoard        = null
    if (this.rate.basePlan === 4) this.rate.bedAndBreakfast  = null
    if (this.rate.basePlan === 5) this.rate.selfCatering     = null
    if (this.rate.basePlan === 6) this.rate.roomOnly         = null

    // Ajax for rate
    axios.put(URLrate, this.rate, headers)

    .then( (response) => {
      if (response.data.error === "noErrors") setTimeout( () => browserHistory.goBack(), 400)
      else Alert.error(response.data.message)
    })
    
    .catch((error) => $.notify(error, "error"))


    // Ajax for childPolicies
    axios.put(URLchildPolicies, this.childPolicies, headers)
    
    .then( (response) => {
      if (response.data.error === "noErrors") Alert.success(response.data.message)
      else Alert.error(response.data.message)
    })
    
    .catch((error) => $.notify(error, "error"))
  }
} // class

// Export
var store_EditRate = new Store_EditRate
export default store_EditRate

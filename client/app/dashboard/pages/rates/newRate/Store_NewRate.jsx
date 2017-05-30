import { observable } from 'mobx';
import axios from 'axios';
import { browserHistory } from 'react-router';
import config from '../../../../sharedFiles/Config.jsx';

class Store_NewRate {

  // dates of the rate
  @observable dates = []
  // holds basic rate info
  @observable rateInfo = {}
  // arrays to store starting values
  @observable childPolicies = []
  @observable cancelPolicies = []
  // arrays to store values that wiil be sent to the server
  @observable rateChildPolicies = []
  @observable rateCancelPolicies = []
  @observable baseOccupancy = null
  @observable numOfDates = 1
  @observable basePlan = null


  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  getBaseOccupancy(propertyID, roomTypeID){
    const userID = window.localStorage.id
    const token = window.localStorage.token
    const headers = {headers: config.headers(token)}
    const URL = config.dashboardAPI + '/user/' + userID + 
      '/properties/' + propertyID + '/baseOccupancy/' + roomTypeID

    axios.get(URL, headers).then( (response) => {

      const {baseOccupancy, message, error} = response.data
      if (error) $.notify(repsonse.data.message, "error")
      this.baseOccupancy = response.data.baseOccupancy

    }).catch((error) => $.notify(error, "error"))
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // get all cancel Policies
  getCancelPolicies(propertyID) {
    const userID = window.localStorage.id
    const token = window.localStorage.token

    axios({

      method: 'get',
      url: config.dashboardAPI + '/user/' + userID +
      '/properties/' + propertyID + '/cancelPolicies/',
      headers: config.headers(token),

    }).then((response) => {

      if (response.data.error === "noErrors")
        this.cancelPolicies = response.data.cancelPolicies;
      else $.notify(response.data.message, "error")

    }).catch((error) => $.notify(error, "error"))
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // get all child Policies
  getChildPolicies(propertyID) {
    // populate rateChildPolicies array with empty objects
    // needed for handleChange in ChildPolicy else it throws error
    for (var i = 0; i < 20; i++) this.rateChildPolicies.push(new Object())

    const userID = window.localStorage.id
    const token = window.localStorage.token

    axios({

      method: 'get',
      url: config.dashboardAPI + '/user/' + userID +
      '/properties/' + propertyID + '/childPolicies/',
      headers: config.headers(token),

    }).then((response) => {

      if (response.data.error === "noErrors")
        this.childPolicies = response.data.childPolicies;
      else $.notify(response.data.message, "error");

    }).catch((error) => $.notify(error, "error"));
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // remove empty objects before sending to the server
  // returns a new array with no empty objects
  formatPolicies(policies) {
    var newPolicies = []

    for (var i = 0; i < 20; i++) {

      if (typeof policies[i].charge !== 'undefined' ||
          typeof policies[i].allInclusive !== 'undefined' ||
          typeof policies[i].fullBoard !== 'undefined' ||
          typeof policies[i].halfBoard !== 'undefined' ||
          typeof policies[i].bedAndBreakfast !== 'undefined' ||
          typeof policies[i].selfCatering !== 'undefined' ||
          typeof policies[i].roomOnly !== 'undefined') {

        newPolicies.push(policies[i]);
      } // end of if
    } // end of for
    return newPolicies
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // when the wizard is finished post the data
  postData(roomTypeID, propertyID) {
    const userID = window.localStorage.id;
    const token = window.localStorage.token;

    let postData = this.rateInfo;
    postData.dates = this.dates;
    postData.propertyID = propertyID;
    postData.roomTypeID = roomTypeID;
    postData.userID = userID;
    // returns array with non empty objects
    postData.rates_childPolicies = this.formatPolicies(this.rateChildPolicies);

    axios({
      method: 'post',
      url: config.dashboardAPI + '/user/' + userID + '/properties/' +
      propertyID + '/roomTypes/' + roomTypeID + '/rates/new',
      headers: config.headers(token),
      data: postData

    }).then((response) => {

      if (response.data.error === "noErrors"){
          $.notify(response.data.message, "success");
          setTimeout( () => browserHistory.goBack(), 400);
      } else $.notify(response.data.message, "error");

    }).catch((error) => $.notify(error, "error"));
  }

} // --> end of store


// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

// export the store
var store_NewRate = new Store_NewRate
export default store_NewRate

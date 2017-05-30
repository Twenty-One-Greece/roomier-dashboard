import { observable } from 'mobx';
import axios from 'axios';
import config from '../../../../sharedFiles/Config.jsx';
import { browserHistory } from 'react-router'

class Store_NewOffer {

  @observable roomTypes = [];
  @observable dates = [];
  @observable rooms = [];
  @observable data = {};

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // posts all data to the server after formating them
  postData(propertyID) {
    const userID = window.localStorage.id
    const token = window.localStorage.token

    let newOffer = {}
    newOffer.data = this.data
    newOffer.data.propertyID = propertyID
    newOffer.data.userID = userID
    newOffer.rooms = this.rooms

    // Check if dates have been set
    if (this.checkDates(this.dates) === 'Error') newOffer.dates = []
    else newOffer.dates = this.dates

    axios({

      method: 'post',
      url: config.dashboardAPI + '/user/' + userID +
      '/properties/' + propertyID + '/specialOffers/new',
      headers: config.headers(token),
      data: newOffer

    }).then((response) => {

      if (response.data.error === "noErrors") {
        $.notify(response.data.message, "success")
        this.offers = response.data.specialOffers
        setTimeout( () => browserHistory.goBack(), 2000);
      } else $.notify(response.data.message, "error")

    }).catch((error) => $.notify(error, "error"))
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  checkDates(dates) {
    let error = null
    dates.forEach( (date) => {
      if (!date.bookingDateStart) error = "Error"
      if (!date.bookingDateEnd) error = "Error"
      if (!date.stayDateStart) error = "Error"
      if (!date.stayDateEnd) error = "Error"
    })
    return error
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  getRoomNames(propertyID) {
    const userID = window.localStorage.id;
    const token = window.localStorage.token;

    axios({

        method: 'get',
        url: config.dashboardAPI + '/user/' + userID +
          '/properties/' + propertyID + '/roomTypes-names',
        headers: config.headers(token),

      }).then((response) => {

        if (response.data.error === "noErrors") {
          this.roomTypes = response.data.roomTypes;
          this.rooms = new Array
        } else $.notify(response.data.message, "error");

      }).catch((error) => $.notify(error, "error"));
  }
}

//＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
// export the store
var store_NewOffer = new Store_NewOffer
export default store_NewOffer

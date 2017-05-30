import { observable } from 'mobx';
import axios from 'axios';
import moment from 'moment'
import { browserHistory } from 'react-router';


import config from '../../../../sharedFiles/Config.jsx';

class Store_SpecialDates {


  @observable dates = {
    date: null,
    toDate: null,
    alotment: null,
    basePlanPrice: null,
    minimumStay: null,
    checkInDisallowed: null,
    stopSales: null
  };

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  sendDataToServer(propertyID, roomTypeID) {
    const userID = window.localStorage.id;
    const token = window.localStorage.token;

    this.dates.propertyID = propertyID
    this.dates.roomTypeID = roomTypeID
    this.dates.userID = userID

    return axios({

        method: 'post',
        url: config.dashboardAPI + '/user/' + userID + '/properties/' +
        propertyID + "/roomTypes/" + roomTypeID + "/specialDates/",
        headers: config.headers(token),
        data: this.dates

      }).then((response) => {
        const { data } = response;

        if (data.error === "noErrors") {
          setTimeout( () => browserHistory.goBack(), 400);
          $.notify(data.message, "success")
        } else $.notify(data.message, "error")

      }).catch((error) => $.notify(error, "error"));
  } // sendDataToServer
}

// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
// export the store
var store_SpecialDates = new Store_SpecialDates
export default store_SpecialDates

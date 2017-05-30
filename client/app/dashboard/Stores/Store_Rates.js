import { observable } from 'mobx';
import axios from 'axios';
import { browserHistory } from 'react-router';
import moment from 'moment'

import config from '../../sharedFiles/Config.jsx';

class Store_Rates {

  @observable rate = {};
  @observable specialDates = [];

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  getRate(roomTypeID, rateID, propertyID) {
    const userID = window.localStorage.id;
    const token = window.localStorage.token;

    axios({
        method: 'get',
        url: config.dashboardAPI + '/user/' + userID + '/properties/' +
        propertyID + "/roomTypes/" + roomTypeID + "/rates/" + rateID,
        headers: config.headers(token),
      })
      .then((response) => {
        const { data } = response

        if (data.error === "noErrors") {
          this.rate = data.rates[0]
          this.specialDates = data.specialDates;
        }
        else $.notify(data.error, "error")

      }).catch((error) => $.notify(error, "error"));
  } // getProperties

} // end of class

// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
// export the store
var store_Rates = new Store_Rates
export default store_Rates

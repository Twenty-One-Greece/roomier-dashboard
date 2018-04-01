import { observable } from "mobx";
import axios from "axios";
import moment from "moment";
import { browserHistory } from "react-router";
import Alert from "react-s-alert";

import config from "../../../../sharedFiles/Config.jsx";

class Store_SpecialDates {
  @observable
  data = {
    date: null,
    toDate: null,
    alotment: null,
    basePlanPrice: null,
    minimumStay: null,
    checkInDisallowed: null,
    stopSales: null
  };

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  addDate(propertyID, roomTypeID, date) {
    const userID = window.localStorage.id;
    const token = window.localStorage.token;
    this.data.date = date;
    this.data.toDate = date;
    this.data.userID = userID;
    this.data.propertyID = propertyID;
    this.data.roomTypeID = roomTypeID;

    return axios({
      method: "post",
      url:
        config.dashboardAPI +
        "/user/" +
        userID +
        "/properties/" +
        propertyID +
        "/roomTypes/" +
        roomTypeID +
        "/specialDates/",
      headers: config.headers(token),
      data: this.data
    })
      .then(response => {
        const { data } = response;
        if (data.error === "noErrors") {
          setTimeout(() => browserHistory.goBack(), 400);
          Alert.success(data.message);
        } else Alert.error(data.message);
      })
      .catch(error => Alert.error(error, "error"));
    this.creanData();
  } // sendDataToServer

  cleanData() {
    this.data = {
      date: null,
      toDate: null,
      alotment: null,
      basePlanPrice: null,
      minimumStay: null,
      checkInDisallowed: null,
      stopSales: null
    };
  }
}

// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
// export the store
var store_SpecialDates = new Store_SpecialDates();
export default store_SpecialDates;

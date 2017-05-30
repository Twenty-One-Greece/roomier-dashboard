import { observable } from 'mobx';
import axios from 'axios';
import { browserHistory } from 'react-router';
import moment from 'moment'

import config from '../../../sharedFiles/Config.jsx';

class Store_Calendar {
  // for the form
  @observable properties = [];
  // form data
  @observable data = {
    startDate: moment(),
    endDate: moment().add(1, 'months'),
    propertyID: null
  }

  @observable calendar = {
    calendarLoading: 'Loading...',
    rooms: [],
    rates: [],
    roomsCount: null,
    dates: {},
    differenceOfDays: null
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  getProperties() {
    const userID = window.localStorage.id;
    const token = window.localStorage.token;
    axios({
        method: 'get',
        url: config.dashboardAPI + '/user/' + userID + '/properties-name/',
        headers: config.headers(token),
      })
      .then((response) => {
        if (response.data.error === "noErrors") {
          this.properties = response.data.properties;
          if (response.data.properties.length > 0) {
            this.data.propertyID = this.properties[0].id;
            this.getCalendar(this.data);
          }
        } else $.notify(response.data.message, "error");
      }).catch((error) => $.notify(error, "error"));
  } // getProperties

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  getCalendar() {
    this.calendar.calendarLoading = "Loading..."
    const userID = window.localStorage.id;
    const token = window.localStorage.token;
    const { data } = this;

    let dataForServer = {};
    // format the dates
    dataForServer.startDate = moment(data.startDate).format('YYYY-MM-DD');
    dataForServer.endDate = moment(data.endDate).format('YYYY-MM-DD');
    dataForServer.propertyID = data.propertyID;

    axios({
        method: 'post',
        url: config.dashboardAPI + '/user/' + userID + '/ratesOverview',
        headers: config.headers(token),
        data: dataForServer
      })
      .then((response) => {
        if (response.data.error === "noErrors") {
          const { data } = response
          data.calendarLoading = "Finished!";
          this.calendar = data;

        } else this.calendar.calendarLoading = "An Error ocured!"

      }).catch((error) => $.notify(error, "error"));
  } //getCalendar

} // class

// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
// export the store
var store_Calendar = new Store_Calendar
export default store_Calendar

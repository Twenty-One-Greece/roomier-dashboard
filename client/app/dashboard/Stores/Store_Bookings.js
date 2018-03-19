import { observable } from "mobx";
import axios from "axios";
import moment from "moment";
import config from "../../sharedFiles/Config.jsx";

class Store_Bookings {
  @observable bookings = [];
  @observable bookingsFull = [];

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  getBookingDates(roomTypeID, rateID, propertyID) {
    const userID = window.localStorage.id;
    const token = window.localStorage.token;
    const URL =
      config.dashboardAPI +
      "/user/" +
      userID +
      "/properties/" +
      propertyID +
      "/roomTypes/" +
      roomTypeID +
      "/bookings/";
    const headers = { headers: config.headers(token) };

    return axios
      .get(URL, headers)

      .then(response => {
        const { data } = response;
        if (data.error === "noErrors") this.bookings = data.bookings;
        else $.notify(data.error, "error");
      })

      .catch(error => $.notify(error, "error"));
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  getBookingsFull(propertyID) {
    const userID = window.localStorage.id;
    const token = window.localStorage.token;
    const URL =
      config.dashboardAPI +
      "/user/" +
      userID +
      "/properties/" +
      propertyID +
      "/bookingsFull/";
    const headers = { headers: config.headers(token) };

    return axios
      .get(URL, headers)

      .then(response => {
        const { data } = response;
        if (data.error === "noErrors") this.bookingsFull = data.bookings;
        else $.notify(data.error, "error");
      })

      .catch(error => $.notify(error, "error"));
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  deleteBooking(bookingID, propertyID) {
    const userID = window.localStorage.id;
    const token = window.localStorage.token;
    const URL =
      config.dashboardAPI +
      "/user/" +
      userID +
      "/properties/" +
      propertyID +
      "/bookings/" +
      bookingID;
    const headers = { headers: config.headers(token) };

    return axios
      .delete(URL, headers)

      .then(response => {
        const { data } = response;
        if (data.error === "noErrors") this.getBookingsFull(propertyID);
        else $.notify(data.error, "error");
      });
  }
} // class

// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
// Export the store
var store_Bookings = new Store_Bookings();
export default store_Bookings;

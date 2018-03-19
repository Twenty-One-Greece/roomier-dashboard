import { observable } from "mobx";
import axios from "axios";
import { browserHistory } from "react-router";
import moment from "moment";
import config from "../../../../sharedFiles/Config.jsx";

class Store_Calendar {
  constructor() {
    // Vars for ajax calls
    this.token = window.localStorage.token;
    this.userID = window.localStorage.id;
    this.headers = { headers: config.headers(this.token) };
  }

  // Array to store info and deliver to the calendar
  @observable
  data = {
    days: [],
    roomTypeID: null,
    loading: false
  };
  @observable monthIndex = moment();
  @observable searchText = null;

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  getBookings(propertyID, roomTypeID) {
    const URL =
      config.dashboardAPI +
      "/user/" +
      this.userID +
      "/properties/" +
      propertyID +
      "/roomTypes/" +
      roomTypeID +
      "./bookings";

    // Make tha call
    return axios.get(URL, this.headers);
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // This functions consecutively calls the functions below it
  // after it gets the data from the server, to create days array
  // This function calls formatDatesAndRates()
  getRatesWithSpecialDates(propertyID, roomTypeID) {
    const URL =
      config.dashboardAPI +
      "/user/" +
      this.userID +
      "/properties/" +
      propertyID +
      "/roomTypes/" +
      roomTypeID +
      "./ratesCalendar";

    // Make tha call
    return axios.get(URL, this.headers);
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // This function calls the previus 2 functions and gets the data
  getDayDataAndBookings(propertyID, roomTypeID) {
    // Takes an array of functions with ajax calls
    // and makes those calls. Then calls functions below
    axios
      .all([
        //this.getBookings(propertyID, roomTypeID),
        this.getRatesWithSpecialDates(propertyID, roomTypeID)
      ])
      .then(
        axios.spread(ratesWithSpDates => {
          const { rates, specialDates, error } = ratesWithSpDates.data;
          if (error === "noErrors")
            this.formatDatesAndRates(rates, specialDates, roomTypeID);
          else console.log(error);
        })
      );
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Creates the days calculating the start and end date of the rate
  // Calls matchDays()
  formatDatesAndRates(rates, specialDates, roomTypeID) {
    // Clear array before any calculation
    this.data.days = [];
    this.data.loading = true;
    this.data.roomTypeID = roomTypeID;

    // Get month of the fisrt rate
    if (rates.length) {
      // this.monthIndex = moment(rates[0].startDate)
      this.searchText = this.monthIndex.format("MM-YYYY");
    }

    // Calculate data for each rate
    rates.forEach(rate => {
      let { startDate, endDate } = rate;
      startDate = moment(startDate);
      endDate = moment(endDate);

      for (var i = startDate; i <= endDate; i.add(1, "day")) {
        // Init each days data
        let day = {
          checkInDisallowed: null,
          stopSales: null,
          date: i.format("ddd DD-MM-YYYY"),
          dateNonFormat: i.format("YYYY-MM-DD"),
          roomTypeID: roomTypeID,
          alotment: rate.alotment,
          minimumStay: rate.minimumStay,
          releaseRoom: rate.releaseRoom,
          basePlanPrice: rate.basePlanPrice
        };

        // If day is a special date, calculate accordingly
        day = this.matchDays(day, specialDates);

        // Push day to the data array
        this.data.days.push(day);
      } // For each day
    }); // For each rate
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Matches dates and special dates to calculate each days values
  // Calls formatSpecialDate()
  matchDays(day, specialDates) {
    specialDates.forEach(spDate => {
      // Format date. spDate and specDate are different vars
      const specDate = moment(spDate.date).format("YYYY-MM-DD");
      const specDateEnd = moment(spDate.toDate).format("YYYY-MM-DD");
      const date = moment(day.dateNonFormat);

      // Check date if between dates of special date
      if (date.isBetween(specDate, specDateEnd, null, "[]")) {
        day = this.formatSpecialDate(day, spDate);
      }

      if (specDate === specDateEnd && date.format("YYYY-MM-DD") === specDate) {
        day = this.formatSpecialDate(day, spDate);
      }
    }); // For each
    return day;
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // This function formats the data of each day that is a special date
  // If data exists it replaces the data else leaves it as is
  formatSpecialDate(day, specialDate) {
    const {
      alotment,
      minimumStay,
      checkInDisallowed,
      basePlanPrice,
      stopSales,
      releaseRoom
    } = specialDate;

    if (alotment) day.alotment = alotment;
    if (minimumStay) day.minimumStay = minimumStay;
    if (releaseRoom) day.releaseRoom = releaseRoom;
    if (basePlanPrice) day.basePlanPrice = basePlanPrice;
    if (!checkInDisallowed) day.checkInDisallowed = checkInDisallowed;
    day.stopSales = stopSales;

    return day;
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Loops through daysWithoutBookings and calculates alotment
  // acording to bookings
  calculateBookings(days, bookingDates) {
    days.forEach(day => {
      bookingDates.forEach(booking => {
        const { checkIn, checkOut } = booking;
        const check = day.date.isBetween(checkIn, checkOut, null, "[]");
        if (check) day.alotment--;
      }); // bookingDates
    }); // daysWithoutBookings
  }
}

// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
// export the store
var store_Calendar = new Store_Calendar();
export default store_Calendar;

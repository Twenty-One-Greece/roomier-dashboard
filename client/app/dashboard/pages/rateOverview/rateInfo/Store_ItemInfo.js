import { observable } from 'mobx';
import axios from 'axios';
import { browserHistory } from 'react-router';
import moment from 'moment'

import config from '../../../../sharedFiles/Config.jsx';

class Store_ItemInfo {

  @observable data = {
    rate: {},
    specialDates: [],
    bookings: {},
    dataPerDay: []
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // This functions calls calculateDataPerDay
  getItemInfo(propertyID, roomTypeID, rateID ) {
    // Clear any previus data per day !impoertant
    this.data.dataPerDay = [];

    const userID = window.localStorage.id;
    const token = window.localStorage.token;

    axios({
        method: 'get',
        url: config.dashboardAPI + '/user/' + userID +
        '/calendar/ratesBookings/' +
        propertyID + "/" + roomTypeID + "/" + rateID,
        headers: config.headers(token),

      }).then((response) => {
        const {bookings, rates,
               specialDates, error} = response.data;

        if (response.data.error === "noErrors") {

          this.data.bookings = bookings;
          this.data.rate = rates[0];
          this.data.specialDates = specialDates;
          this.calculateDataPerDay()

        } else $.notify(error, "error")

      }).catch((error) => $.notify(error, "error"));
    } // getRate

    // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

    // Calculate alotments per day according to bookings and specialDates
    // This functions calls calculateAlotment and calculateSpecialDates
    calculateDataPerDay() {
      const { rate, bookings, specialDates } = this.data;
      const startDate = moment(rate.startDate);
      const endDate = moment(rate.endDate);

      for (var i = startDate; i < endDate; i.add(1, 'day')) {
        // Make the object to push in the array
        let dayData = {
          date: i.format('YYYY-MM-DD'),
          alotment: rate.alotment,
          releaseRoom: rate.releaseRoom,
          minimumStay: rate.minimumStay,
          basePlanPrice: rate.basePlanPrice,
          stopSales: null,
        }

        // Calculate alotment according to bookings
        const {alotment} = dayData;
        dayData.alotment = this.calculateAlotment(bookings, i, alotment)

        // Calculate special day data
        dayData = this.calculateSpecialDates(specialDates, i, dayData)

        // After the calculations push the object to the array
        this.data.dataPerDay.push(dayData);

      } //end of for loop

      // After all calculations are done display the modal
      $('#myModal').modal()
    }

    // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

    // For every booking reeduces the alotment by 1. Return alotment
    // This functions is called in calculateDataPerDay
    calculateAlotment(bookings, i, alotment) {
      bookings.forEach( (booking) => {
        const {checkIn, checkOut} = booking
        if (i.isBetween(checkIn, checkOut, null, '[]')) alotment--
      });
      return alotment
    }

    // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

    // For every booking reeduces the alotment by 1. Return alotment
    // This functions is called in calculateDataPerDay
    calculateSpecialDates(specialDates, i, dayData) {
      specialDates.forEach((specialDate) => {

        specialDate.date = moment(specialDate.date).format('YYYY-MM-DD');
        if (i.format("YYYY-MM-DD") === specialDate.date) {

          // Format the data of each day
          dayData = this.formatSpecialDate(dayData, specialDate)
        } // end of if
      });
      return dayData
    }

    // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

    // This function is called in calculateSpecialDates
    formatSpecialDate(dayData, specialDate) {
      const { alotment, minimumStay,
              basePlanPrice, stopSales } = specialDate

      if (alotment) dayData.alotment = alotment;
      if (minimumStay) dayData.minimumStay = minimumStay;
      if (basePlanPrice) dayData.basePlanPrice = basePlanPrice;
      if (stopSales) dayData.stopSales = stopSales;

      return dayData
    }


} // end of class

// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
// export the store
var store_ItemInfo = new Store_ItemInfo
export default store_ItemInfo

import { observable } from 'mobx';
import axios from 'axios';
import { browserHistory } from 'react-router';
import moment from 'moment'

import config from '../../../../sharedFiles/Config.jsx';

class Store_NewSpecialDate {

  @observable data = {
    date: null,
    alotment: null,
    basePlanPrice: null,
    minimumStay: null
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  submitData(rateID, propertyID) {
    const token = window.localStorage.token;
    const userID = window.localStorage.id;

    axios({
      method: 'post',
      url: config.dashboardAPI + '/user/' + userID +
      '/calendar/rateSpecialDates/' + propertyID + '/' + rateID,
      headers: config.headers(token),
      data: this.data

    }).then((response) => {
      if (response.data.error === "noErrors") {

        $.notify(response.data.message, "success");
        setTimeout( () => browserHistory.goBack(), 400);

      } else $.notify(response.data.message, "error");

    }).catch((error) => $.notify(error, "error"));
  }
}



// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

// export the store
var store_NewSpecialDate = new Store_NewSpecialDate
export default store_NewSpecialDate

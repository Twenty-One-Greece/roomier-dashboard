import { observable } from "mobx";
import axios from "axios";

import config from "../../sharedFiles/Config.jsx";

class Store_SpecialOffers {
  @observable offers = [];

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  // gets dates that have offers applied to them
  getDatesOffers(propertyID) {
    const userID = window.localStorage.id;
    const token = window.localStorage.token;

    axios({
      method: "get",
      url:
        config.dashboardAPI +
        "/user/" +
        userID +
        "/properties/" +
        propertyID +
        "/dates-specialOffers",
      headers: config.headers(token)
    })
      .then(response => {
        if (response.data.error === "noErrors")
          this.offers = response.data.specialOffers;
        else $.notify(response.data.message, "error");
      })
      .catch(error => $.notify(error, "error"));
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  // gets offers containing all dates they apply to
  getOffersDates(propertyID) {
    const userID = window.localStorage.id;
    const token = window.localStorage.token;

    axios({
      method: "get",
      url:
        config.dashboardAPI +
        "/user/" +
        userID +
        "/properties/" +
        propertyID +
        "/specialOffers-dates",
      headers: config.headers(token)
    })
      .then(response => {
        if (response.data.error === "noErrors")
          this.offers = response.data.specialOffers;
        else $.notify(response.data.message, "error");
      })
      .catch(error => $.notify(error, "error"));
  }
}
//＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
// export the store
var store_SpecialOffers = new Store_SpecialOffers();
export default store_SpecialOffers;

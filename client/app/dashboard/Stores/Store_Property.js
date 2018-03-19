import { observable } from "mobx";
import axios from "axios";

import config from "../../sharedFiles/Config.jsx";

class Store_Property {
  @observable property = {}; // One property
  @observable properties = []; // All properties

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // get one property
  getProperty(propertyID) {
    const userID = window.localStorage.id;
    const token = window.localStorage.token;

    axios({
      method: "get",
      url:
        config.dashboardAPI + "/user/" + userID + "/properties/" + propertyID,
      headers: config.headers(token)
    })
      .then(response => {
        if (response.data.error === "noErrors")
          this.property = response.data.property[0];
        else $.notify(response.data.message, "error");
      })
      .catch(error => $.notify(error, "error"));
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // get one property
  getAllProperties() {
    const userID = window.localStorage.id;
    const token = window.localStorage.token;
    axios({
      method: "get",
      url: config.dashboardAPI + "/user/" + userID + "/properties/",
      headers: config.headers(token)
    })
      .then(response => {
        if (response.data.error === "noErrors")
          this.properties = response.data.properties;
        else $.notify(response.data.message, "error");
      })
      .catch(error => $.notify(error, "error"));
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // update one property
  updateProperty(propertyID) {
    axios({
      method: "put",
      url:
        config.dashboardAPI + "/user/" + userID + "/properties/" + propertyID,
      headers: config.headers(token)
    })
      .then(response => {
        if (response.data.error === "noErrors")
          $.notify(response.data.message, "success");
        else $.notify(response.data.message, "error");
      })
      .catch(error => $.notify(error, "error"));
  }
}

//＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
// export the store
var store_Property = new Store_Property();
export default store_Property;

import { observable } from "mobx";
import axios from "axios";

import config from "../../sharedFiles/Config.jsx";

class Store_ChildPolicies {
  @observable policies = [];

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
  // get one property
  getChildPolicies(propertyID) {
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
        "/childPolicies",
      headers: config.headers(token)
    })
      .then(response => {
        console.log(response);

        if (response.data.error === "noErrors")
          this.policies = response.data.childPolicies;
        else $.notify(response.data.message, "error");
      })
      .catch(error => $.notify(error, "error"));
  }
}

//＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
// export the store
var store_ChildPolicies = new Store_ChildPolicies();
export default store_ChildPolicies;

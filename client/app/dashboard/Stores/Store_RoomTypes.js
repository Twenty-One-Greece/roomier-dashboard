import axios from "axios";
import { observable } from "mobx";

import config from "../../sharedFiles/Config.jsx";

class Store_RoomTypes {
  @observable roomType = { id: "" }; // One room type
  @observable roomTypes = []; // All room types

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // get one property
  getAllRoomTypes(propertyID) {
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
        "/roomTypes",
      headers: config.headers(token)
    })
      .then(response => {
        const { error, roomTypes, message } = response.data;
        if (error === "noErrors") {
          this.roomTypes = roomTypes;
          this.roomType = roomTypes[0];
        } else $.notify(message, "error");
      })
      .catch(error => $.notify(error, "error"));
  }
}

//＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
// export the store
var store_RoomTypes = new Store_RoomTypes();
export default store_RoomTypes;

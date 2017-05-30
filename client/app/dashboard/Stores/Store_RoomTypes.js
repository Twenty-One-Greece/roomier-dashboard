import { observable } from 'mobx'
import axios from 'axios'

import config from '../../sharedFiles/Config.jsx'

class Store_RoomTypes {

  @observable roomType = {}    // One room type
  @observable roomTypes = []  // All room types

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // get one property
  getAllRoomTypes(propertyID) {
    const userID = window.localStorage.id;
    const token = window.localStorage.token;
    axios ({

        method: 'get',
        url: config.dashboardAPI + '/user/' + userID +
        '/properties/' + propertyID + '/roomTypes',
        headers: config.headers(token),

      }).then((response) =>  {

        const { error, roomTypes, message } = response.data
        if (error === "noErrors") this.roomTypes = roomTypes
        else $.notify(message, "error")

      }).catch((error) => $.notify(error, "error"))
  }

}

//＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
// export the store
var store_RoomTypes = new Store_RoomTypes
export default store_RoomTypes

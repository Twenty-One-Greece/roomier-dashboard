import React from "react";
import store_RoomTypes from "../../../Stores/Store_RoomTypes";
import { observer } from "mobx-react";

@observer
class SelectRoom extends React.Component {
  constructor(props) {
    super(props);

    this.handleRoomChange = this.handleRoomChange.bind(this);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Get all roomtypes
  componentWillMount() {
    const { propertyID, store_Calendar } = this.props;
    store_RoomTypes.roomTypes = [];
    store_RoomTypes.getAllRoomTypes(propertyID);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Handle change of room
  handleRoomChange(e) {
    const roomTypeID = e.target.value;
    const { propertyID, store_Calendar } = this.props;
    store_Calendar.getDayDataAndBookings(propertyID, roomTypeID);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    const { propertyID, getFirstRoomData } = this.props;
    const { roomTypes } = store_RoomTypes;

    // When rooms have been returned from the server
    if (roomTypes.length) {
      const roomTypeID = roomTypes[0].id;
      getFirstRoomData(propertyID, roomTypeID);
    }

    // Create select input
    this.options = roomTypes.map(roomType => {
      return (
        <option key={roomType.id} value={roomType.id}>
          {roomType.name}
        </option>
      );
    });

    return (
      <select
        onChange={this.handleRoomChange}
        className="form-control sel-room"
      >
        {this.options}
      </select>
    );
  }
}

//＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

export default SelectRoom;

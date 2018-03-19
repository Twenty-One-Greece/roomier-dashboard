import React from "react";
import { Link, browserHistory } from "react-router";
import { observer } from "mobx-react";
import BackButton from "../../../components/BackButton.jsx";
import store_RoomTypes from "./../../../Stores/Store_RoomTypes";
import store_Calendar from "./Store_Calendar.js";
import SelectRoom from "./SelectRoom.jsx";
import DayData from "./DayData.jsx";
import moment from "moment";
import Spinner from "react-spin";

@observer
class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.changeMonth = this.changeMonth.bind(this);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // For safety remove all entries from the array
  componentWillMount() {
    store_Calendar.data.days = [];
    store_Calendar.searchText = null;
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // For safety remove all entries from the array
  componentWillUnmount() {
    store_Calendar.data.days = [];
    store_Calendar.searchText = null;
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  changeMonth(e) {
    // Show next month
    if (e === "next") {
      store_Calendar.monthIndex = store_Calendar.monthIndex.add(1, "month");
      store_Calendar.searchText = store_Calendar.monthIndex.format("MM-YYYY");
    }

    // Show previous month
    if (e === "prev") {
      store_Calendar.monthIndex = store_Calendar.monthIndex.subtract(
        1,
        "month"
      );
      store_Calendar.searchText = store_Calendar.monthIndex.format("MM-YYYY");
    }
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // This function is called by SelectRoom component When
  // all roomtypes have been returned from the server
  getFirstRoomData(propertyID, roomTypeID) {
    store_Calendar.getDayDataAndBookings(propertyID, roomTypeID);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    const { propertyID } = this.props.params;
    const { days, roomTypeID } = store_Calendar.data;
    const { monthIndex, searchText } = store_Calendar;
    const month = monthIndex.format("MMMM YYYY");
    var { loading } = store_Calendar.data;
    console.log(store_Calendar.monthSelected);

    if (days.length) loading = false;
    else loading = true;

    // Generate data for each day
    this.dayData = days.map((day, i) => {
      return (
        <DayData
          key={i}
          searchText={searchText}
          propertyID={propertyID}
          dayData={day}
        />
      );
    });

    var spinCfg = {
      width: 14,
      scale: 0.25,
      radius: 35
    };

    return (
      <div className="row">
        <div className="col-xs-12 breadcump">
          Calendar / Property ID: {this.props.params.propertyID}
        </div>
        <div className="col-xs-12">
          <div className="x_panel">
            <div className="x_title">
              <div className="col-xs-3">
                <BackButton />
              </div>
              <div className="col-xs-offset-5 col-xs-4">
                <SelectRoom
                  getFirstRoomData={this.getFirstRoomData}
                  propertyID={propertyID}
                  store_Calendar={store_Calendar}
                />
              </div>
              <div className="clearfix" />
            </div>

            <div className="x_content">
              <small className="hint">
                Below are the data for each day individualy. You can edit the
                data for each day by pressing the "Edit" button on the right of
                each day. You can also edit many days together by pressing the
                "Mass Edit Dates" button. Stop Sales is indicated by the red
                line on the left of each day. Press the buttons to search
                through months
              </small>

              <br />
              <br />
              <div className="row">
                <div className="col-md-4 col-sm-4 col-xs-6">
                  <Link
                    to={
                      "dashboard/calendar/" +
                      propertyID +
                      "/roomType/" +
                      roomTypeID +
                      "/massEdit"
                    }
                    type="button"
                    className="btn btn-success left"
                  >
                    Mass Edit Dates
                  </Link>
                </div>
                <div className="xs-offset-2 col-md-4 col-sm-4 col-xs-6">
                  <h4>
                    <span
                      className="pointer"
                      onClick={() => this.changeMonth("prev")}
                    >
                      <i className="fa fa-chevron-left" />
                    </span>
                    &nbsp; {month} &nbsp;
                    <span
                      className="pointer"
                      onClick={() => this.changeMonth("next")}
                    >
                      <i className="fa fa-chevron-right" />
                    </span>
                  </h4>
                </div>
              </div>
            </div>
            <br />
            <div className="x_content">
              <Spinner config={spinCfg} stopped={!loading} />
              <table className="table table-hover" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th style={{ textAlign: "center" }}>Alotment</th>
                    <th style={{ textAlign: "center" }}>Price</th>
                    <th style={{ textAlign: "center" }}>Release</th>
                    <th style={{ textAlign: "center" }}>Stay</th>
                    <th style={{ textAlign: "center" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>{this.dayData}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;

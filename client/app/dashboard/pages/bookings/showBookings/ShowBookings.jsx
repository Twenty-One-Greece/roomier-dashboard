import React from "react";
import { Link } from "react-router";
import BackButton from "../../../components/BackButton.jsx";
import store_Bookings from "./../../../Stores/Store_Bookings";
import { observer } from "mobx-react";
import Booking from "./Booking.jsx";

@observer
class ShowBookings extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { propertyID } = this.props.params;
    store_Bookings.getBookingsFull(propertyID);
  }

  render() {
    const { propertyID } = this.props.params;
    const { bookingsFull } = store_Bookings;

    this.bookings = bookingsFull.map(booking => {
      return (
        <Booking
          key={booking.id}
          booking={booking}
          store_Bookings={store_Bookings}
          propertyID={propertyID}
        />
      );
    });

    return (
      <div className="row">
        <div className="col-xs-12 breadcump">Bookings / {propertyID}</div>
        <div className="col-xs-12">
          <div className="x_panel">
            <div className="x_title">
              <BackButton />
              <div className="clearfix" />
            </div>
            <div className="x_content">
              <div className="row">
                <div className="col-sm-12">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>CheckIn / Out</th>
                        <th>Room Type</th>
                        <th>Price</th>
                        <th>Lead Guest</th>
                        <th>Remarks</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>{this.bookings}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowBookings;

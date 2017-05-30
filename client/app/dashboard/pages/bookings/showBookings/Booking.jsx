import React        from 'react';
import moment       from 'moment'

class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.deleteBooking = this.deleteBooking.bind(this)
  }

  deleteBooking(bookingID) {
    const { store_Bookings, propertyID } = this.props
    store_Bookings.deleteBooking(bookingID, propertyID)
  }

  render() {
    const { booking } = this.props
    return (
    <tr>
      <td>{booking.bookingID}</td>
      <td>
        {moment(booking.checkIn).format('YYYY-MM-DD')}<br/>
        {moment(booking.checkOut).format('YYYY-MM-DD')}
      </td>
      <td>{booking.roomTypeID} chenge!</td>
      <td>
        {booking.bookingTotalPrice} &#8364;<br/>
        {booking.mealPlan}
      </td>
      <td>
        {booking.name} {booking.surname}     <br/>
        {booking.email}                      <br/>
        {booking.phone}                      <br/>
        {booking.address}                    <br/>
      </td>
      <td>{booking.comments}</td>

      <td><a onClick={() => this.deleteBooking(booking.id)} className="btn btn-default custom-btn-red"> &nbsp; Delete </a></td>
    </tr>
    )
  }
    
}

export default Booking
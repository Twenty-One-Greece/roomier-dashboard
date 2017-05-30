import React from 'react';
import moment from 'moment'
import { Link } from 'react-router';
import { observer } from 'mobx-react';

@observer
class DayData extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dayData, searchText, propertyID } = this.props
    let stopSales = null

    // Change class to show stopSales (thin red line to th left)
    if (dayData.stopSales) stopSales = 'stop-sales'

    // If there is searchText and is not equal to date, dont show date
    // Make it lowercase for easier search
    if (searchText &&
        !dayData.date.toLowerCase().includes(searchText)) return null

    return(
      <tr className={stopSales}>
        <td>{dayData.date}</td>
        <td style={{textAlign: "center"}}>{dayData.alotment}</td>
        <td style={{textAlign: "center"}}>{dayData.basePlanPrice}</td>
        <td style={{textAlign: "center"}}>{dayData.releaseRoom}</td>
        <td style={{textAlign: "center"}}>{dayData.minimumStay}</td>

        <td style={{textAlign: "center"}}>

          <Link to={'dashboard/calendar/' + propertyID +
          '/roomType/' + dayData.roomTypeID + '/edit/' +
          dayData.dateNonFormat}
          type="button" className="btn btn-default custom-btn-green">
          Edit</Link>

        </td>
      </tr>
    )
  }
}

export default DayData

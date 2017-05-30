import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import axios from 'axios';
import { observer } from 'mobx-react';
import { Link } from 'react-router';
import config from '../../../../sharedFiles/Config.jsx';

@observer
class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.stopSales = this.stopSales.bind(this);
    this.startSales = this.startSales.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Depending if row has stopSales enabled calls the appropriate function
  handleClick(stopSales) {

    if (stopSales) this.startSales()
    else this.stopSales()
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Create new special date with stop sales = 1
  stopSales(){
    const { dayData, store_ItemInfo } = this.props;
    const { propertyID, roomTypeID, rateID } = this.props.params;
    const userID = window.localStorage.id;
    const token = window.localStorage.token;

    // Format data
    const data = {
      stopSales: 1,
      date: dayData.date
    }

    // Send data to server
    axios({
        method: 'post',
        url: config.dashboardAPI + '/user/' + userID +
        '/calendar/rateSpecialDates/' + propertyID + "/" + rateID,
        headers: config.headers(token),
        data: data

      }).then((response) => {
        const { data } = response;

        if (data.error === 'noErrors')
          store_ItemInfo.getItemInfo(propertyID, roomTypeID, rateID)
        else $.notify(data.message, "error")

      }).catch((error) => $.notify(error, "error"));
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Deletes special date
  startSales(){
    const { dayData, store_ItemInfo } = this.props;
    const { propertyID, roomTypeID, rateID } = this.props.params;
    const userID = window.localStorage.id;
    const token = window.localStorage.token;

    // Send data to server
    axios({
        method: 'delete',
        url: config.dashboardAPI + '/user/' + userID +
        '/calendar/rateSpecialDates/' + rateID + "/" + dayData.date,
        headers: config.headers(token),

      }).then((response) => {
        const { data } = response;

        if (data.error === 'noErrors')
          store_ItemInfo.getItemInfo(propertyID, roomTypeID, rateID)
        else $.notify(data.message, "error")

      }).catch((error) => $.notify(error, "error"));
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    const { dayData } = this.props;
    const { propertyID, rateID } = this.props.params
    const dayDate = moment(dayData.date).format('ddd, DD MMM')

    // Mark stop sales with a red line and change texts
    // Also the buttons' functionality changes
    let stopSales = "";
    let buttonText = "Stop";
    let buttonClass = "btn btn-danger btn-xs right";
    let style = {}

    // Check if stopSales to apply changes
    if (dayData.stopSales) {
      style = {display:'none'};
      stopSales = 'stop-sales';
      buttonClass = "btn btn-success btn-xs right"
      buttonText = "Start";
    }

    // Render html
    return(
      <tr className = {stopSales}>
        <td>{dayDate}</td>
        <td style={{textAlign: "center"}}>{dayData.alotment}</td>
        <td style={{textAlign: "center"}}>{dayData.basePlanPrice}</td>
        <td style={{textAlign: "center"}}>{dayData.releaseRoom}</td>
        <td style={{textAlign: "center"}}>{dayData.minimumStay}</td>
        <td style={{textAlign: "center"}}>

          <Link
          to = {'dashboard/calendar/rateInfo' + '/' +
          propertyID + '/' + rateID + '/' + dayData.date + '/new'}
          className="btn btn-primary btn-xs"
          style = {style}>
              <i className="fa fa-edit"></i> Edit
          </Link>

          <button
          onClick={() => this.handleClick(dayData.stopSales)}
          className={buttonClass}>
              <i className="fa fa-ban"></i> {buttonText}
          </button>

        </td>
      </tr>
    )
  }
}

// ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

export default TableRow

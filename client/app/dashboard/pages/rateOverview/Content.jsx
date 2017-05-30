import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { observer } from 'mobx-react';
import Timeline from 'react-calendar-timeline'
import vis from 'vis'
import { browserHistory } from 'react-router';

@observer
class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.timeline = null

    this.renderCalendar = this.renderCalendar.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // renders the calendar when data exists (using vis.js)
  renderCalendar(div) {
    const { store_Calendar } = this.props;
    const { calendar } = store_Calendar;
    const { rooms, rates, offers, calendarLoading } = calendar;

    // Initialize arrays for vis.js
    let formatedRates = [];
    let formatedRooms = [];
    let formatedOffers = [];

    // Format rooms, rates, offers in new arrays
    rooms.forEach((item) => formatedRooms.push(item))
    rates.forEach((item) => formatedRates.push(item))
    offers.forEach((item) => formatedOffers.push(item))

    // Create DataSets (allows two way data-binding) and options
    const items = new vis.DataSet(formatedRates.concat(formatedOffers));
    const groups = new vis.DataSet(formatedRooms);
    const options = {margin: {item: 25},selectable:false};

    // Create a Timeline
    if (calendarLoading === 'Finished!')
      this.timeline = new vis.Timeline(div, items, groups, options);

    // Call handleClick
    //this.timeline.on('click', (props) => this.handleClick(props));
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // when user clicks a rate all rate info are shown per day
  handleClick(props) {
    const { propertyID } = this.props.store_Calendar.data;
    const { group, item } = props;

    // If rate is clicked. Offers dont return a number
    // Redirect user to show per day info
    if (typeof props.item === 'number') {
      window.location = '/#/dashboard/calendar/rateInfo/' +
      propertyID + '/' + group + '/' + item;
    }
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    const { store_Calendar } = this.props;
    const { calendar } = store_Calendar;
    const { calendarLoading } = calendar;

    if (calendarLoading === "Loading...")
      return <h2>{calendarLoading}</h2>

    if (calendarLoading === "An Error ocured!")
      return <h2>{calendarLoading}</h2>

    if (calendarLoading === "Change") return( <div>fwe</div> )

    if (calendarLoading === "Finished!")
      return(
      <div>
        <div id="vis" ref={ (div) => {this.renderCalendar(div)} }></div>
      </div>
    )
    return( <div></div> );
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // destroy timeline before unmounting
  componentWillUnmount() {
    const { store_Calendar } = this.props;
    store_Calendar.calendar.calendarLoading = 'Change';
    this.timeline.destroy();
  }
}

export default Content

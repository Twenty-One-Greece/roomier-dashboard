import React from 'react'
import moment from 'moment'
import { render } from 'react-dom'
import { observer } from 'mobx-react'
import DatePicker from 'react-datepicker'

@observer
class Wiz_DatesRendered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null,
      endDate: null
    }
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Push an empty object in dates array
  componentWillMount() {
    const {store_NewRate} = this.props
    store_NewRate.dates.push({
      startDate: null,
      endDate: null
    })
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Handle datepicker changes
  handleDateChangeStart(date) {
    const { store_NewRate, index } = this.props
    this.setState({startDate:date})
    store_NewRate.dates[index].startDate = date.format('YYYY-MM-DD')
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Handle datepicker changes
  handleDateChangeEnd(date) {
    const { store_NewRate, index } = this.props
    this.setState({endDate:date})
    store_NewRate.dates[index].endDate = date.format('YYYY-MM-DD')
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    return(
      <div>
        <div className="form-group col-md-6 col-sm-6 col-xs-6">
          <label>Rate Start Date</label><br />
            <DatePicker
                maxDate = {this.state.endDate}
                className = {"form-control col-md-7 col-xs-12"}
                dateFormat = {'YYYY-MM-DD'}
                selected = {this.state.startDate}
                onChange = {this.handleDateChangeStart.bind(this)} />
        </div>

        <div className="form-group col-md-6 col-sm-6 col-xs-6">
          <label>Rate End Date</label><br />
            <DatePicker
                minDate = {this.state.startDate}
                className = {"form-control col-md-7 col-xs-12"}
                dateFormat = {'YYYY-MM-DD'}
                selected = {this.state.endDate}
                onChange = {this.handleDateChangeEnd.bind(this)} />
        </div>
      </div>
    )
  }
}

export default Wiz_DatesRendered

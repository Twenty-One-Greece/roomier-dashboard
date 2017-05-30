import React from 'react';
import moment from 'moment'
import { observer } from 'mobx-react';
import BackButton from '../../../components/BackButton.jsx';
import store_ItemInfo from './Store_ItemInfo.js'
import TableRow from './TableRow.jsx'

@observer
class RateInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // When component is about to mount call server for dataPerDay
  // Data for each day are created automaticaly in the store
  componentWillMount(){
    const { rateID, roomTypeID, propertyID } = this.props.params;

    // Call server for data.
    store_ItemInfo.getItemInfo(propertyID, roomTypeID, rateID);
  }

  // ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    const { rate, dataPerDay } = store_ItemInfo.data;
    const { params } = this.props;
    
    // Generate rows of the table with each day's data
    this.rows = dataPerDay.map((dayData, i) => {
      return <TableRow
                key = {i}
                dayData = {dayData}
                store_ItemInfo = {store_ItemInfo}
                params = {params} />
    })

    return(
      <div className="row">
        <div className="col-xs-12">
          <div className="x_panel">
            <div className="x_title">
              <BackButton />
              <h2 className="pageHeader">Rate, per day info</h2>
              <div className="clearfix"></div>
            </div>
            <div className="x_content">
              <table className="table table-striped" style={{width:'100%'}}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Alotment</th>
                    <th>Price</th>
                    <th>Release</th>
                    <th>Stay</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  { this.rows }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RateInfo

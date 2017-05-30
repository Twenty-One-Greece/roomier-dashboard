import React from 'react';

const TableHead = () => {

  // -----------------------------------------------
  // renders html
    return(
      <tr>
        <th style={{width: 17 + "%"}}>Stay Dates</th>
        <th style={{width: 17 + "%"}}>Booking Dates</th>

        <th>Name</th>
        <th>Cumulative</th>
        <th>Min. Stay</th>
        <th>Type</th>
        <th>Discount</th>
        <th style={{width: 15 + "%"}}>Actions</th>
      </tr>
    )
  }

export default TableHead

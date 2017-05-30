import React from 'react';

const TableHead = () => {
    return(
      <tr>
        <th>Name</th>
        <th>Period</th>
        <th>Base Meal Plan</th>
        <th>Minimum Stay</th>
        <th>Extra Pax</th>
        <th style={{width: 20 + "%"}}>Actions</th>
      </tr>
    )
  }

export default TableHead

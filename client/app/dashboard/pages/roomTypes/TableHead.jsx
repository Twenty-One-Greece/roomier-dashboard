import React from 'react';

const TableHead = () => {
  // -----------------------------------------------
  // renders html
    return(
      <tr>
        <th style={{width: 1 + "%"}}>ID</th>
        <th style={{width: 20 + "%"}}>Name</th>
        <th>Total Rooms</th>
        <th>Max PAX</th>
        <th>Subcategories</th>
        <th style={{width: 20 + "%"}}>Actions</th>
      </tr>
    )
  }

export default TableHead

import React from 'react';

const TableHead = () => {

  // -----------------------------------------------
  // renders html
    return(
      <tr>
        <th style={{width: 1 + "%"}}>ID</th>
        <th style={{width: 10 + "%"}}>Name</th>
        <th>Short Description</th>
        <th>Subcategories</th>
        <th style={{width: 20 + "%"}}>Actions</th>
      </tr>
    )
  }

export default TableHead

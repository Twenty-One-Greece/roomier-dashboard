import React        from 'react';
import config       from '../../../sharedFiles/Config.jsx';
import { Link }     from 'react-router';

class Property extends React.Component {
  render() {

    const { property, searchText } = this.props

    if ((!property.name.toLowerCase().includes(searchText) &&
      !property.city.toLowerCase().includes(searchText)) &&
      searchText) return null 

     return (
      <li>
        <div className="block">
          <div className="tags">
            <Link to={'dashboard/bookings/' + property.id } className="tag"><span>Bookings</span></Link>
          </div>
          <div className="block_content">
            <h2 className="title"><a>{property.name}</a></h2>
            <div className="byline"><span>Phone</span> by <a>{property.phone}</a></div>
          </div>
        </div>
      </li>
    )
  }
}

export default Property

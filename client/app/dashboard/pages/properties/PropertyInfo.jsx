import React              from 'react'
import axios              from 'axios'
import { Link }           from 'react-router'
import config             from '../../../sharedFiles/Config.jsx'
import Alert              from 'react-s-alert'

class PropertyInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      display: true
    }
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // Deletes a property according to the component props id
  deleteProperty(propertyID) {
    const userID      = window.localStorage.getItem('id')
    const token       = window.localStorage.getItem('token')
    const headers     = { headers: config.headers(token) }
    const URL         = config.dashboardAPI + '/user/' + userID + '/properties/' + propertyID

    axios.delete(URL, headers).then((response) => {

      if (response.data.error === 'noErrors') {
        this.setState({display: false})
      } else Alert.error(response.data.message)

    }).catch((error) => console.log("An error occured!"))
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  // renders html
  render() {
    const { property, searchText }   = this.props
    const partOfUrl                  = 'dashboard/properties/' + property.id
    let logo                         = null

    // Check for not displaying empty image
    if (property.logo) logo = <img src={config.API + '/uploads/logos/' + property.logo} className="avatar" alt="Avatar" />

    if (this.state.display === false) return null

    else if ((!property.name.toLowerCase().includes(searchText) &&
        !property.city.toLowerCase().includes(searchText)) &&
        searchText) return null

    else return (
    <tr>
      <td>{property.id}</td>
      <td><b>{property.name}</b></td>

      <td>
        <Link to={partOfUrl + '/amenities'} className="btn btn-default"> Amenities </Link>
        <Link to={partOfUrl + '/roomTypes'} className="btn btn-default"> Room Types </Link>
        <Link to={partOfUrl + '/specialOffers'} className="btn btn-default"> Special Offers </Link>
        <Link to={partOfUrl + '/images'} className="btn btn-default"> Images </Link>
        <br />
        <Link to={partOfUrl + '/cancelPolicies'} className="btn btn-default"> Cancelation Policies </Link>
        <Link to={partOfUrl + '/childPolicies'} className="btn btn-default"> Child Policies </Link>
      </td>

      <td>
        <Link to={'dashboard/properties/' + property.id} className="btn btn-default custom-btn-green"> &nbsp; Edit </Link>
        <a onClick={() => this.deleteProperty(property.id)} className="btn btn-default custom-btn-red"> &nbsp; Delete </a>
      </td>
    </tr>
    )
  }

}
//＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

export default PropertyInfo

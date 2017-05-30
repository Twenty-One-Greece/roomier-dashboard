import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import config from '../../../sharedFiles/Config.jsx';
import Alert from 'react-s-alert';

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.deleteImage = this.deleteImage.bind(this)
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  deleteImage() {
    const {image, getImages, propertyID, roomTypeID} = this.props
    const token = window.localStorage.token
    const userID = window.localStorage.id
    const headers = {headers: {'x-access-token': token}}
    const URL = config.dashboardAPI + '/user/' + userID +
          '/properties/' + propertyID +'/roomTypes/' +
          roomTypeID +'/images/' + image.image

    axios.delete(URL, headers).then( (response) => {

      if (response.data.error === "noErrors") getImages()
      else Alert.error(response.data.message)

    }).catch((error) => $.notify(error, "error"))

  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    const {image} = this.props
    return(
    <div className="col-sm-3">
       <div className="thumbnail">
          <div className="view view-first">
            <img style={{width: '100%', display: 'block'}}
            src={config.API + "/uploads/rooms/" + image.image}/>
            <div className="mask">
              <p><br /></p>
              <div className="tools tools-bottom">
                <a onClick={this.deleteImage}>
                  <i className="fa fa-times"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Image

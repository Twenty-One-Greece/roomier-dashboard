var React = require('react');
var Dropzone = require('react-dropzone');
import axios from 'axios';
import config from '../../../sharedFiles/Config.jsx';
import BackButton from '../../components/BackButton.jsx';
import Image from './Image.jsx'
import Alert from 'react-s-alert';

class RoomTypeImages extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    }

    this.onDropImage = this.onDropImage.bind(this);
    this.getImages = this.getImages.bind(this);
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  componentWillMount() {
    this.getImages()
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  getImages() {
    const token = window.localStorage.token
    const userID = window.localStorage.id
    const { propertyID, roomTypeID } = this.props.params
    const headers = {headers: {'x-access-token': token}}
    const URL = config.dashboardAPI + '/user/' + userID +
          '/properties/' + propertyID +'/roomTypes/' +
          roomTypeID + '/images'

    axios.get(URL, headers).then((response) => {

      const {error, message, images} = response.data
      if (error) $.notify(message, "error")
      else this.setState({images: images})

    }).catch((error) => $.notify(error, "error"))
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  onDropImage(files) {
    const token = window.localStorage.token
    const userID = window.localStorage.id
    const { propertyID, roomTypeID } = this.props.params
    const file = new FormData()
    const headers = {headers: {'x-access-token': token}}
    const URL = config.dashboardAPI + '/user/' + userID +
          '/properties/' + propertyID +'/roomTypes/' +
          roomTypeID +'/images'

    // Append the uploaded file
    file.append('imageRoom',files[0])

    axios.post(URL, file, headers).then((response) => {

      if (response.data.error === "noErrors") {
        Alert.success(response.data.message)
        this.getImages()
      } else Alert.error(response.data.message)

    }).catch((error) => $.notify(error, "error"))
  }


  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    const { propertyID, roomTypeID } = this.props.params

    this.images = this.state.images.map( (image, i) => {
      return <Image key={i}
                     image={image}
                     propertyID={propertyID}
                     roomTypeID={roomTypeID}
                     getImages={this.getImages}/>
    })


    return (
      <div className="row">
        <div className="col-xs-12 breadcump">
          Property ID:{this.props.params.propertyID} /
          Room Type ID: {this.props.params.propertyID} /
          Room Amenities
        </div>
        <div className="col-sm-12">
          <div className="x_panel">
            <div className="x_title">
              <BackButton />
              <ul className="nav navbar-right panel_toolbox">
              </ul>
              <div className="clearfix"></div>
            </div>
            <div className="x_content">
            <div className="col-sm-4">
              <Dropzone
                className={'dropzone'}
                multiple={false}
                onDrop={this.onDropImage} >
                <div>
                  <h2>Image Upload </h2>
                  <small className="hint">Drop a photo here, or click to select file to upload.</small>
                  <br /><br />

                </div>
              </Dropzone>
            </div>

              {this.images}

          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default RoomTypeImages

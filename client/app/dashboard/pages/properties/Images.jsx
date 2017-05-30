var React = require('react');
var Dropzone = require('react-dropzone');
import axios from 'axios';
import config from '../../../sharedFiles/Config.jsx';
import BackButton from '../../components/BackButton.jsx';
import Alert from 'react-s-alert';

class Images extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      logo: null
    }

    this.onDropImage = this.onDropImage.bind(this);
    this.onDropLogo = this.onDropLogo.bind(this);
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
    const { propertyID } = this.props.params
    const headers = {headers: {'x-access-token': token}}
    const URL = config.dashboardAPI + '/user/' + userID +
          '/properties/' + propertyID +'/images'

    axios.get(URL, headers).then((response) => {

      const {error, message, images} = response.data
      if (error) $.notify(message, "error")
      else this.setState({image: images.image, logo: images.logo})

    }).catch((error) => $.notify(error, "error"))
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  onDropImage(files) {
    const token = window.localStorage.token
    const userID = window.localStorage.id
    const { propertyID } = this.props.params
    const file = new FormData()
    const headers = {headers: {'x-access-token': token}}
    const URL = config.dashboardAPI + '/user/' + userID +
          '/properties/' + propertyID +'/image'

    // Append the uploaded file
    file.append('image',files[0])

    axios.post(URL, file, headers).then((response) => {

      if (response.data.error === "noErrors") {
        Alert.success(response.data.message)
        this.getImages()
      } else Alert.error(response.data.message)

    }).catch((error) => $.notify(error, "error"))
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  onDropLogo(files) {
    const token = window.localStorage.token;
    const userID = window.localStorage.id;
    const { propertyID } = this.props.params;
    const file = new FormData();
    const headers = {headers: {'x-access-token': token}}
    const URL = config.dashboardAPI + '/user/' + userID +
    '/properties/' + propertyID +'/logo'

    // Append the uploaded file
    file.append('logo' ,files[0]);

    axios.post(URL, file, headers).then((response) => {

      if (response.data.error === "noErrors") {
        Alert.success(response.data.message);
        this.getImages()
      } else Alert.error(response.data.message);

    }).catch((error) => $.notify(error, "error"));
  }

  //＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

  render() {
    let logo = ""
    let image = ""

    // Check if image exists
    if (this.state.image) image = (
      <img className="images" src={config.API +
          "/uploads/properties/" + this.state.image} />
    )

    // Check if logo exists
    if (this.state.logo) logo = (
      <img className="images"
      src={config.API + "/uploads/logos/" + this.state.logo} />
    )

    return (
      <div className="row">
        <div className="col-xs-12 breadcump">
          Property ID:{this.props.params.propertyID} / Images
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
            <div className="col-sm-6">
              <Dropzone
                className={'dropzone'}
                multiple={false}
                onDrop={this.onDropImage} >
                <div>
                  <h2>Image Upload </h2>
                  <small className="hint">Drop a photo here, or click to select file to upload.</small>
                  <br /><br />
                  {image}
                </div>
              </Dropzone>
            </div>

            <div className="col-sm-6">
              <Dropzone
                className={'dropzone'}
                multiple={false}
                onDrop={this.onDropLogo} >
                <div>
                  <h2>Logo Upload </h2>
                  <small className="hint">Drop your logo here, or click to select file to upload.</small>
                  <br /><br />
                  {logo}
                </div>
              </Dropzone>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Images

// Init object to export
var config = {};

// Toggle between commenting the 2 vars to change between production and localhost server.

// production server
config.API = "http://128.199.34.214";
// localhost server
// config.API = "http://localhost:8000";

// Dashboard API
config.dashboardAPI = config.API + "/dashboard";

// This function is used to make the header for each server requerst as the
// Server requires at least the token to be used in every transaction
config.headers = function(token){
  return {
    'Content-Type': 'application/json',
    'x-access-token': token
  }
}

// Automaticaly creates credentials for ajax calls
config.credentials = function() {
  let credentials = {};
  credentials.token = window.localStorage.token;
  credentials.userID = window.localStorage.id;
  return credentials
}

// Used in select boxes
config.countries = ["Albania", "Andorra", "Armenia", "Austria", "Azerbaijan", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria",
"Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Georgia", "Germany", "Greece",
"Hungary", "Iceland", "Ireland", "Italy", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg",
"Macedonia", "Malta", "Moldova", "Monaco", "Montenegro", "The Netherlands", "Norway", "Poland", "Portugal", "Romania", "Russia",
"San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Turkey", "Ukraine", "United Kingdom", "Vatican City"];

export default config;

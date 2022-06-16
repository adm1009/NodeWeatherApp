const request = require("request");
const getdata = (address, callback) => {
  const url =
    "http://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYWRtMTAwOSIsImEiOiJjbDRjY21wOXYwZHp6M2hwYms3dnNocHA4In0.5Bjdhx__0g9g-cTR5O52rg&limit=1";
  //
  request({ url, json: true }, (err, { body }) => {
    // console.log(response);
    if (err) {
      callback("unable to connect", undefined);
    } 
    else if (body.features.length === 0) {
      callback("unable to find location", undefined);
    } 
    else {
      callback(undefined, {
        longitude: body.features[0].center[1],
        latitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
    // const data = JSON.parse(response);
  });
};

module.exports = getdata;

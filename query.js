// Code by: Jonas Wilms (https://stackoverflow.com/a/48034279)

var query = function(args){
    return "?" + Object.entries(args).map(([key, value]) => {
      return key +"="+ (Array.isArray(value)? value.join(",") : value);
   }).join("&");
 }

 module.exports = query
var config = require('./../config.js');
var exports = {};
var base64Img = require('base64-img');
var path = require('path');
var imageStore = path.join(__dirname, '../public/img')

var MakeId = function(length){
    if(!length) length = 5;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


var NameImage = function(listing){
  return MakeId()+'-'+listing;
}


exports.process64 = function(base64, listing){
  var name = NameImage(listing);
  var filePath = base64Img.imgSync(base64, imageStore, name);
  var fileObject = {
    iternal: filePath,
    external: config.domain+'img/'+name+'.jpg'
  }
  return fileObject;
}



module.exports = exports;

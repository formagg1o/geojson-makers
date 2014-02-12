var request = require('request')
var _ = require('underscore')
var fs = require('fs')

var makers = [];
request.get({ url: 'http://api.formagg.io/maker/search?size=1000', json: true }, function(err, data) {

  _.each(data.body.results, function(maker) {
  	if (maker.location.lat && maker.location.lng) {

  	  var img = img ? '<img src="' + maker.logourl || '' + '">' : ''

      console.log('ddd', img)
  	  var d = { 
  	  	"type": "Feature", 
  	    "id": maker._id.toString(), 
  	    "properties": {
  	    	"marker-symbol": "warehouse",
  	    	"marker-size": "small",
  	    	"stroke-width": 1,
  	    	"Maker": maker.name || 'NA',
  	    	"Where": (maker.country || '') + ' ' + (maker.state || ''),
  	    	"Info": img + '<br><b>' + (maker.name || 'NA') + '</b><br><a href="http://api.formagg.io/maker/' + maker._id + '" target="_blank">more</a>',
  	    }, 
  	    "geometry": { 
  	    	"type": "Point", 
  	    	"coordinates": [ maker.location.lng, maker.location.lat ] 
  	    } 
  	  }

  	  makers.push(d)
  	}
  })

  var geojson = { "type": "FeatureCollection", "features": makers }

      fs.writeFile("./test.geojson", JSON.stringify(geojson, null, 4), function(err) {
	    if(err) {
	        console.log(err);
	    } else {
	        console.log("The file was saved!");
	    }
	  })

  //console.log(geojson)
})



$( document ).ready(function(){
// add a map to the page
  mapboxgl.accessToken = '';
  var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
      center: [-122.4090999999994,37.784400000000024], // starting position
      zoom: 14 // starting zoom
  });
// when the map loads we add our layers
  map.on('load', function () {
// create our data source from our Json
    map.addSource("popos", {
      type: "geojson",
      data: "POPOS.geojson",
      cluster: true,
      clusterMaxZoom: 18,
      clusterRadius: 50
    })

    // create the first layer for the unclustered points

    map.addLayer({
        "id": "unclustered-points",
        "type": "symbol",
        "source": "popos",
        "filter": ["!has", "point_count"],
        "layout": {
          "icon-image": "park-15",
          "text-field": "{name}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top"
        }
    });

    //Define our 3 different layers

    var layers = [
      [25, '#f28cb1', 20],
      [8, '#f1f075', 18],
      [0, '#51bbd6', 16]
    ]

    layers.forEach(function(layer, i){
      map.addLayer({
        "id": "cluster-" + i,
        "type": "circle",
        "source": "popos",
        "paint": {
          "circle-color": layer[1],
          "circle-radius": layer[2]
        },
        "filter": i === 0 ?
          [">=", "point_count", layer[0]] :
          ["all",
            [">=", "point_count", layer[0]],
            ["<", "point_count", layers[i-1][0]]]
      });
    });
//
    map.addLayer({
        "id": "cluster-count",
        "type": "symbol",
        "source": "popos",
        "layout": {
            "text-field": "{point_count}",
            "text-font": [
                "DIN Offc Pro Medium",
                "Arial Unicode MS Bold"
            ],
            "text-size": 12
        }
    });
    map.on('click', function(e){
      var features = map.queryRenderedFeatures(e.point, { layers: ['unclustered-points'] });

      if (!features.length){
        return;
      }

      var feature = features[0]



      var popup = new mapboxgl.Popup({
      })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(feature.properties.descriptio)
        .addTo(map);
    })

    map.on('mousemove', function (e) {
      var features = map.queryRenderedFeatures(e.point, { layers: ['unclustered-points'] });
      map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    });
  });

})

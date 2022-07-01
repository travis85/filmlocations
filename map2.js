let resultData = []
const movieData =  async ()=> {
    await axios.get("https://data.sfgov.org/resource/yitu-d5am.json")
        .then((result) => {
        result.data.forEach(data => {
            resultData.push(data)
        });
    })
}
movieData()


let map;
let geocoder;

function initMap() {

    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 11,
    });

    function codeAddress() {
        const input = document.querySelector('input');
        input.addEventListener('input', function(e){
            let typedInput = e.target.value.toUpperCase()

            resultData.filter((movie, index) => {
                const cali = 'San Francisco, CA'
                const title = movie.title.toUpperCase()
                if(title.match(typedInput)){
                let address = `https://data.sfgov.org/resource/yitu-d5am.json?locations=${movie.locations}${cali}`; 
                 console.log(address)

                geocoder.geocode({ 'address': address }, function (results, status) {
                if (status == 'OK') {
                map.setCenter(results[0].geometry.location);
                let marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
                } else if (status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) { 
                    console.log("Waiting for Limit for item: "+ item);
                  
                    
                    setTimeout( async function () {
                        await codeAddress()
                        console.log('timeout')
                    }, 500);
                } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });

                }
            })
    

        });

    }
    codeAddress()

}

// Loop through the results array and place a marker for each
// set of coordinates.
const eqfeed_callback = function (results) {
    console.log(results)
  for (let i = 0; i < results.features.length; i++) {
    const coords = results.features[i].geometry.coordinates;
    const latLng = new google.maps.LatLng(coords[1], coords[0]);

    new google.maps.Marker({
      position: latLng,
      map: map,
    });
  }
};

window.initMap = initMap;
window.eqfeed_callback = eqfeed_callback;
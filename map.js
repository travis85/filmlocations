// EXTRACTS ALL THE DATA ON PAGE LOAD
// https://dev.socrata.com/foundry/data.sfgov.org/yitu-d5am
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
// console.log(resultData)
// EVENT LISTENER ON FORM INPUT THET DISPLAYS DATA IN P-TAG
let list = []
const input = document.querySelector('input');
input.addEventListener('input', function(e){
    let typedInput = e.target.value.toUpperCase()

    resultData.filter((movie, index) => {
        const title = movie.title.toUpperCase()
        if(title.match(typedInput)){
            // console.log(typedInput,movie.title)
            list.push(movie.locations)
        }
    })
    
    document.getElementById('values').innerHTML = list.join('')
    if(typedInput.length === 0){
        document.getElementById('values').innerHTML = 'Enter A Valid Title'
    }

});

let geocoder;
let map;
function initMap() {
   
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 12,
    });

    function codeAddress() {
        const cali = 'San Francisco, CA'
        let address = `California @ Montgomery ${cali}`;
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == 'OK') {
                map.setCenter(results[0].geometry.location);
                let marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            } else {
                alert('Geocode was not successful for the following reason: ' + status);
            }
        });
    }
    codeAddress()
}
        
window.initMap = initMap;

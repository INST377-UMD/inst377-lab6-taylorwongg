function createMap(){
    var map = L.map('map').setView([38, -106], 3);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    

    for (let i=0; i<3; i++){
        const lat = getRandomLat();
        const lng = getRandomLng();
        L.marker([lat, lng]).addTo(map)
        


        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
        .then(response => response.json())
                .then(data => {
                    const local = data.locality
                    console.log(local)

                    const markerInfo = document.createElement("p");
                    markerInfo.innerHTML = `Marker ${i+1} (Latitude: ${lat}, Longitude: ${lng}, Locality: ${local}`; 
                    document.getElementById('markerInfo').appendChild(markerInfo);   

        })

    }

}


window.onload = createMap;

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}

function getRandomLat(){
    var lat = getRandomInRange(30,35,3);
    return lat;
}

function getRandomLng(){
    var lng = getRandomInRange(-90,-100,3);
    return lng;
}


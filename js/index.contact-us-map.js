function loadGoogleMapsAPI(callback) {
  if (document.getElementById("google-maps-script")) {
    if (callback) callback();
    return;
  }

  const script = document.createElement("script");
  script.id = "google-maps-script";
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyCLESgcgPM_Y9O-i1CnS-rcstxflNY5Uiw&callback=initMap";
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  script.onload = () => {
    if (callback) callback();
  };
}

function initMap() {
  const location = { lat: 40.706866040933626, lng: -73.86965388665055 };

  const mapStyle = [
    { featureType: "all", elementType: "geometry", stylers: [{ color: "#1f1f1f" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#2b2b2b" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
    { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
    { featureType: "transit", elementType: "all", stylers: [{ visibility: "off" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#c0a062" }] },
    { featureType: "road", elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  ];

  const map = new google.maps.Map(document.getElementById("map"), {
    center: location,
    zoom: 18,
    styles: mapStyle,
    disableDefaultUI: true,
  });

  const marker = new google.maps.Marker({
    position: location,
    map: map,
    title: "Наш офіс",
    icon: {
      url: "img/contact-us/custom-marker.png",
      scaledSize: new google.maps.Size(60, 60),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(25, 50),
    },
  });
}

window.initMap = initMap;

loadGoogleMapsAPI();

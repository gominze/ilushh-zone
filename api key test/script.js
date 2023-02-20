// Konfiguration für Firebase
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
// init
firebase.initializeApp(firebaseConfig);
// Rreferenz zur firebase datenbank
var database = firebase.database();

// save value
function saveSliderValue() {
  var slider = document.getElementById("myRange");
  var value = slider.value;
  // wert in die datenbank schreiben
  database.ref("sliderValue").set(value);
}

// wert in html aktualisieren
function updateSliderValue(value) {
  var sliderValue = document.getElementById("sliderValue");
  sliderValue.innerHTML = value;
}

// listener um änderungen erkennen und den Wert im HTML-Dokument zu aktualisieren
var slider = document.getElementById("myRange");
slider.oninput = function () {
  var value = this.value;
  updateSliderValue(value);
};

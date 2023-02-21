// Konfiguration für Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBRgqLBodBJg4KwkGpjRIJ_7mpe0wvuL50",
  authDomain: "stimmungsndx.firebaseapp.com",
  projectId: "stimmungsndx",
  storageBucket: "stimmungsndx.appspot.com",
  messagingSenderId: "435372091585",
  appId: "1:435372091585:web:1283bf0a6213b26133cc40",
  measurementId: "G-GTBBJ107V5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();

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

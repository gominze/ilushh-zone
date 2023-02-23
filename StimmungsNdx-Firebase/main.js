/*
 _______  ___  ______    _______  _______  _______  _______  _______ 
|       ||   ||    _ |  |       ||  _    ||   _   ||       ||       |
|    ___||   ||   | ||  |    ___|| |_|   ||  |_|  ||  _____||    ___|
|   |___ |   ||   |_||_ |   |___ |       ||       || |_____ |   |___ 
|    ___||   ||    __  ||    ___||  _   | |       ||_____  ||    ___|
|   |    |   ||   |  | ||   |___ | |_|   ||   _   | _____| ||   |___ 
|___|    |___||___|  |_||_______||_______||__| |__||_______||_______|

 */
// 1) Import von Firebase (Vorgabe).

import { initializeApp } from "firebase/app"; //Firebase-APP initialisieren und konfigurieren.
import { getAnalytics } from "firebase/analytics"; //Firebase Analytics-Dienst für die aktuelle App-Instanz zu initialisieren.
import { addDoc, collection } from "firebase/firestore"; /*erstellt neues Dokument in der Firestore-Sammlung.; 
die andere Funktion erstellt eine Referent zum Dokument.*/


// Code importiert Vielzahl von Funktionen und Objekten aus dem Firebase-Store.

import { onSnapshot, getDoc, getDocFromCache, doc, getFirestore, DocumentSnapshot, Firestore, DocumentReference, updateDoc, setDoc, getDocs, documentId }
  from "firebase/firestore";



// Styles werden importiert die im gleichen Verzeichnis wie die aktuelle JavaScript-Datei liegen sollte.

import './style.css'



// 2) Hier wird ein Objekt definiert, das die Konfigurationsoptionen für eine Firebase-App enthält.

const firebaseConfig = {
  apiKey: "AIzaSyBRgqLBodBJg4KwkGpjRIJ_7mpe0wvuL50",
  authDomain: "stimmungsndx.firebaseapp.com",
  projectId: "stimmungsndx",
  storageBucket: "stimmungsndx.appspot.com",
  messagingSenderId: "435372091585",
  appId: "1:435372091585:web:1283bf0a6213b26133cc40",
  measurementId: "G-GTBBJ107V5"
};

// 3) Initialize Firebase Daten speichern und abrufen.

const app = initializeApp(firebaseConfig); // eine Verbindung zur Firebase-Plattform.
const analytics = getAnalytics(app); //Google Analytics-Integration für die Firebase-App zu aktivieren.
const db = getFirestore();


/*
__   __  __   __  _______  ______    _______  _______  _______ 
|  | |  ||  |_|  ||       ||    _ |  |   _   ||       ||       |
|  | |  ||       ||    ___||   | ||  |  |_|  ||    ___||    ___|
|  |_|  ||       ||   |___ |   |_||_ |       ||   | __ |   |___ 
|       ||       ||    ___||    __  ||       ||   ||  ||    ___|
|       || ||_|| ||   |    |   |  | ||   _   ||   |_| ||   |___ 
|_______||_|   |_||___|    |___|  |_||__| |__||_______||_______|

  4) Der Code erstellt eine Umfrageform, in der jeder in der jeder Teilnehmer fünf Fragen beantwortet, indem er Schieberegler bewegt.*/

const form = document.querySelector("#survey-form"); // "form" auf HTML zuvor definiert; gibt eine Liste von Elementen zurück.
const sliders = form.querySelectorAll(".slider"); //  .slider" ist der CSS-Selektor, der Elemente auswählt, die die Klasse "slider" haben.
const result = document.querySelector("#result"); // Für einzelne Teilnehmer.



let sum = 0; // Summe der Bewertungen.
let count = 0; // Anzahl der Bewertungen.



// Der Code fügt für jedes Slider-Element in der Liste "sliders" einen Event-Listener hinzu, der auf Eingaben reagiert.

sliders.forEach(slider => {
  slider.addEventListener("input", function () {
    const id = this.id;
    const valueDisplay = document.querySelector(`#${id}-value`);
    valueDisplay.textContent = this.value;
  });
});



  // Wenn das Formular gesendet wird, wird eine Funktion ausgeführt, die den Wert des Formulars berechnet.

form.addEventListener("submit", event => {
  event.preventDefault();


  // Durchschnitt der 5 Fragen.

  const question1 = parseInt(document.querySelector("#question1").value, 10);
  const question2 = parseInt(document.querySelector("#question2").value, 10);
  const question3 = parseInt(document.querySelector("#question3").value, 10);
  const question4 = parseInt(document.querySelector("#question4").value, 10);
  const question5 = parseInt(document.querySelector("#question5").value, 10);

  const average = (question1 + question2 + question3 + question4 + question5) / 5;



  // Fügt den durchschnittlichen Stimmungsindex des aktuellen Formulars in das results-Array ein.

  sum += average;
  count++;
  const overallAverage = sum / count;



  // Durchschnittsbewertung jedes Benutzers als Teil der Gesamtbewertungen in einem Ergebnisfeld angezeigt.

  const container = document.createElement('div');
  container.className = 'centered'; // um mit CSS arbeiten zu können bezogen auf Teilnehmer.
  container.innerHTML = `Teilnehmer ${count}: ${average}<br>`;
  document.body.appendChild(container);

  result.textContent = overallAverage.toFixed(2); // Anzeige des Durchschnittswerts mit 2 Dezimalstellen.



  // Füge den durchschnittlichen Stimmungsindex in Firebase hinzu.

  addDoc(collection(db, "Umfrageergebnisse"), { durchschnittlicherStimmungsindex: overallAverage })
    .then(() => {
      console.log("Durchschnittlicher Stimmungsindex in Firebase hinzugefügt");
    })
    .catch((error) => {
      console.error("Fehler beim Hinzufügen des durchschnittlichen Stimmungsindexes in Firebase: ", error);
    });

  form.reset();
});



// Abfragen der Daten aus Firebase.

getDocs(collection(db, "Umfrageergebnisse"))
  .then((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });



    
    /*       ___  _______  _______  __    _ 
            |   ||       ||       ||  |  | |
            |   ||  _____||   _   ||   |_| |
            |   || |_____ |  | |  ||       |
         ___|   ||_____  ||  |_|  ||  _    |
        |       | _____| ||       || | |   |
        |_______||_______||_______||_|  |__|
        */


    // 5) Umwandeln der Daten in JSON.

    const jsonData = JSON.stringify(data);



    // Erstellen eines Download-Links.

    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonData);
    downloadLink.download = 'umfrageergebnisse.json';
    downloadLink.innerHTML = 'Download JSON';
    document.body.appendChild(downloadLink);
  })
  .catch((error) => {
    console.error("Fehler beim Abrufen der Daten aus Firebase: ", error);
  });

  //Test Datenabrufen
// Erstellen Sie eine Referenz auf Ihre Firestore-Sammlung
var collectionRef = firebase.firestore().collection('User');

// Abrufen der Daten
collectionRef.get().then(function(querySnapshot) {
    // Speichert die Summe aller eingegebenen Werte und die Anzahl der Einträge
    var sum = 0;
    var count = querySnapshot.size;
    querySnapshot.forEach(function(doc) {
        sum += doc.data().Stimmung;
    });
    
    // Berechnet Stimmungsindexdurchschnitt (Summe durch AnzahlEintrag)
    var average = sum / count;
    
    // Anzeigen lassen in der HTML-Datei
    var averageDisplay = document.getElementById("durchscnittsergebnis");
    averageDisplay.innerHTML = "Der Stimmungsdurchschnitt beträgt aktuell " + average.toFixed(2);
});

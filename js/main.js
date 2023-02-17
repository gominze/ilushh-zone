/* Speichern
"form" wurde auf HTML zuvor definiert
"querySelectorAll" gibt eine Liste von Elementen  zurück was auf CSS sich bezieht
".slider" ist der CSS-Selektor, der Elemente auswählt, die die Klasse "slider" haben.*/

const form = document.querySelector("#survey-form");
const sliders = form.querySelectorAll(".slider");
const result = document.querySelector("#result"); // Für einzelne Teilnehmer

const results = [];


/*Code snippetr hat die Aufgabe für jedes Input-Element in der in der Variable "sliders" 
gespeicherten Liste von HTML-Elementen, einen Event-Listener zu registrieren, 
der auf das "input"-Event reagiert.*/

sliders.forEach(slider => {
  slider.addEventListener("input", function() {
    const id = this.id;
    const valueDisplay = document.querySelector(`#${id}-value`);
    valueDisplay.textContent = this.value;
  });
});

// Wenn das Formular gesendet wird, wird eine Funktion ausgeführt, die den Wert des Formulars berechnet.
form.addEventListener("submit", event => {
  event.preventDefault();

// Durchschnitt der 5 Fragen
const question1 = parseInt(document.querySelector("#question1").value, 10);
const question2 = parseInt(document.querySelector("#question2").value, 10);
const question3 = parseInt(document.querySelector("#question3").value, 10);
const question4 = parseInt(document.querySelector("#question4").value, 10);
const question5 = parseInt(document.querySelector("#question5").value, 10);

const average = (question1 + question2 + question3 + question4 + question5) / 5;

// fügt den durchschnittlichen Stimmungsindex des aktuellen Formulars in das results-Array ein
  results.push(average);


// Durchschnittsbewertung jedes Benutzers als Teil der Gesamtbewertungen in einem Ergebnisfeld angezeigt.
  result.innerHTML += `Aktuelle Stimmung des Teilnehmers Nr. ${results.length} = ${average}<br>`;

// nach 20 Eingaben werden die Einträge gelöscht
  form.reset();


// wenn 20 Stimmen abgegeben sind wird der Stimungsindex ausgerechnet.
  if (results.length === 20) {
    // kalkulieren
    const overallAverage = results.reduce((sum, result) => sum + result, 0) / results.length;
    result.innerHTML += `Der durchschnittliche Stimmungsindex aller Teilnehmer beträgt: ${overallAverage}`;
  }
});

function downloadResults() {
  const jsonData = JSON.stringify(results);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'stimmung.json';
  a.click();

  URL.revokeObjectURL(url);
}

const downloadButton = document.createElement('button');
downloadButton.textContent = 'Download Result';
downloadButton.addEventListener('click', downloadResults);

// fügen Sie die Schaltfläche zur Seite hinzu
document.body.appendChild(downloadButton);

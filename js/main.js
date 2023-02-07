// Speichern
const form = document.querySelector("form");

// Ergebnis zeigen
const result = document.querySelector("#result");

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

  result.textContent = `Dein aktuelle Stimmungsindex beträgt: ${average}`;
});

// Überprüfen Sie, ob das Formular abgesendet wurde
document.querySelector("#mood-form").addEventListener("submit", function(e) {
    e.preventDefault();


// Berechnen Sie den Stimmungsindex
    const question1 = parseInt(document.querySelect)
});


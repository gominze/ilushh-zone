// Speichern
const form = document.querySelector("#survey-form");
const sliders = form.querySelectorAll(".slider");

sliders.forEach(slider => {
  slider.addEventListener("input", function() {
    const id = this.id;
    const valueDisplay = document.querySelector(`#${id}-value`);
    valueDisplay.textContent = this.value;
  });
});

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
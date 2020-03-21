const formValue = document.querySelector(".weatherFormInput") ;
const formBtn = document.querySelector(".weatherFormButton");
const errorParagraph = document.querySelector(".errorParagraph");
const temperature = document.querySelector(".temperatureNumber");
const temperatureUnit = document.querySelector(".temperatureUnit");

formBtn.addEventListener("click", (e) => {
  e.preventDefault();

  errorParagraph.textContent = "";

  const location = formValue.value;

  fetch(`/weather?adress=${location}`)
  .then(res => res.json())
  .then(data => {
    if (data.error) {
      errorParagraph.textContent = "You have to provide an adress!";
    } else {
        temperature.textContent = data.forecast.temperature;

        temperatureUnit.classList.remove("temperatureUnitDisplay")
      }
  })
});

import {fetchBreeds, fetchCatByBreed} from "./cat-api"
const breedSelect = document.querySelector(".breed-select");
const loaderClass = document.querySelector(".loader");
const errorClass = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");
const chooseCat = document.querySelector(".choose");

fetchBreeds().then(response => {
    const markup = response.map((data) =>
        `<option value="${data.id}">${data.name}</option>`
    ).join("")
    breedSelect.insertAdjacentHTML("beforeend", markup);
});
hideError();
loaderClass.style.display = "none";
catChoose("Please, choose a cat")
breedSelect.addEventListener('change', evt => {
    const selectedBreed = evt.target.value;
    if (selectedBreed) {
        chooseCat.style.display = "none";
    loaderClass.style.display = "block";
    fetchCatByBreed(selectedBreed)
        .then(cat => {
            catInfo.innerHTML = "";
        catInformation(cat);
      })
      .catch(() => {
        showError("Oops! Something went wrong! Try reloading the page or choose another cat!");
      })
        .finally(() => {
          loaderClass.style.display = "none";
      })
    }
})

function catInformation(cat) {
const catInformationHTML =  `<img src="${cat.url}" alt="${cat.breeds[0].name}" width=500 />
    <h1>Breed: ${cat.breeds[0].name}</h1>
    <p style= "width: 700px">Description: ${cat.breeds[0].description}</p>
    <p>Temperament: ${cat.breeds[0].temperament}</p>`

    catInfo.innerHTML = catInformationHTML;
}

function showError(message) {
    errorClass.textContent = message;
    errorClass.style.display = "block";
}

function hideError() {
    errorClass.style.display = "none";
}

function catChoose(message) {
    chooseCat.textContent = message;
    chooseCat.style.display = "block";
}
import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_0RurphY4Apx2sZKRwykOEJEDpvZbVWQi5CrB0Q09kj5b63kDWegBzOFJ2DGzz0bA";

 export function fetchBreeds() {
    const BASE_URL = "https://api.thecatapi.com/v1/breeds";
    return axios
        .get(BASE_URL)
        .then(response => response.data)
    .catch(err => error(err))
}

export function fetchCatByBreed(breedId) {
    const URL_ID = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`

    return axios
        .get(URL_ID)
        .then(response => response.data[0])
        .catch(err => error(err))
}
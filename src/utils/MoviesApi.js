import {MOVIES_URL} from "./constants"

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export const getAllMovies = () => {
  return fetch(`${MOVIES_URL}/beatfilm-movies`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(getResponse)
    .then((data) => {
      return data;
    });
};

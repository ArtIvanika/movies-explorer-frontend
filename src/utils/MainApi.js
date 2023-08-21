// export const MAIN_URL = "http://localhost:3000";
export const MAIN_URL = 'https://api.films.nomoredomains.xyz';

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

export const register = (name, email, password) => {
  return fetch(`${MAIN_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then(getResponse)
  .then((res) => {
    return res;
  });
};

export const authorize = (email, password) => {
  return fetch(`${MAIN_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(getResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        return data;
      }
    })
    .then((res) => {
      return res;
    });
};

export const checkToken = (token) => {
  return fetch(`${MAIN_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(getResponse);
};

export const getUserInfo = () => {
  const token = localStorage.getItem("token");
  return fetch(`${MAIN_URL}/users/me`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  })
    .then(getResponse)
    .then((res) => res);
};

export const updateUserInfo = ({ name, email }) => {
  const token = localStorage.getItem("token");
  return fetch(`${MAIN_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  })
    .then(getResponse)
    .then((res) => {
      return res;
    });
};

export const getSavedMovies = () => {
  const token = localStorage.getItem("token");
  return fetch(`${MAIN_URL}/movies`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(getResponse)
    .then((res) => {
      return res;
    });
};

export const saveMovie = (movie) => {
  const token = localStorage.getItem("token");
  return fetch(`${MAIN_URL}/movies`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({...movie
    //   country: movie.country,
    //   director: movie.director,
    //   duration: movie.duration,
    //   year: movie.year,
    //   description: movie.description,
    //   image: movie.imageUrl,
    //   trailerLink: movie.trailerLink,
    //   thumbnail: movie.imageUrl,
    //   movieId: movie.movieId,
    //   nameRU: movie.nameRU,
    //   nameEN: movie.nameEN,
    }),
  })
    .then(getResponse)
    .then((res) => {
      return res;
    });
};

export const deleteMovie = (movieId) => {
  const token = localStorage.getItem("token");
  return fetch(`${MAIN_URL}/movies/${movieId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(getResponse)
  .then((res) => {
    console.log(res)
    return res;
  });
};

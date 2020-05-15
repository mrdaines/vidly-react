import * as genresAPI from "./fakeGenreService";

const movies = [
  {
    _id: "5b21ca3eeb7f6fbccd471807",
    title: "Tom & Jerry",
    genre: { _id: "5b21ca3eeb7f6fbccd571701", name: "Action" },
    numberInStock: 1,
    liked: true,
    dailyRentalRate: 2.5,
    publishDate: "2018-01-03T19:04:28.809Z"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471808",
    title: "Treasure Island",
    genre: { _id: "5b21ca3eeb7f6fbccd571701", name: "Action" },
    numberInStock: 12,
    liked: false,
    dailyRentalRate: 1.5,
    publishDate: "2018-01-03T19:04:28.809Z"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471809",
    title: "Davey Crockett",
    genre: { _id: "5b21ca3eeb7f6fbccd571701", name: "Action" },
    numberInStock: 3,
    liked: false,
    dailyRentalRate: 1.75,
    publishDate: "2018-01-03T19:04:28.809Z"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471810",
    title: "Star Wars Lego",
    genre: { _id: "5b21ca3eeb7f6fbccd571702", name: "Comedy" },
    numberInStock: 2,
    liked: false,
    dailyRentalRate: 2.75,
    publishDate: "2018-01-03T19:04:28.809Z"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471811",
    title: "Black Beard's Ghost",
    genre: { _id: "5b21ca3eeb7f6fbccd571702", name: "Comedy" },
    numberInStock: 4,
    liked: true,
    dailyRentalRate: 0.5,
    publishDate: "2018-01-03T19:04:28.809Z"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471812",
    title: "Lady & The Tramp",
    genre: { _id: "5b21ca3eeb7f6fbccd571703", name: "Drama" },
    numberInStock: 2,
    liked: false,
    dailyRentalRate: 2.25,
    publishDate: "2018-01-03T19:04:28.809Z"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471813",
    title: "The Great Muppet Caper",
    genre: { _id: "5b21ca3eeb7f6fbccd571701", name: "Action" },
    numberInStock: 1,
    liked: false,
    dailyRentalRate: 1.25,
    publishDate: "2018-01-03T19:04:28.809Z"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471814",
    title: "The Princess Bride",
    genre: { _id: "5b21ca3eeb7f6fbccd571702", name: "Comedy" },
    numberInStock: 5,
    liked: false,
    dailyRentalRate: 2.25,
    publishDate: "2018-01-03T19:04:28.809Z"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "National Treasure",
    genre: { _id: "5b21ca3eeb7f6fbccd571701", name: "Action" },
    numberInStock: 6,
    liked: false,
    dailyRentalRate: 2.5,
    publishDate: "2018-01-03T19:04:28.809Z"
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Big Hero 6",
    genre: { _id: "5b21ca3eeb7f6fbccd571701", name: "Action" },
    numberInStock: 5,
    liked: true,
    dailyRentalRate: 2.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Spy Kids",
    genre: { _id: "5b21ca3eeb7f6fbccd571704", name: "Thriller" },
    numberInStock: 8,
    liked: false,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Bugs Bunny: Bugsy & Mugsy",
    genre: { _id: "5b21ca3eeb7f6fbccd571702", name: "Comedy" },
    numberInStock: 7,
    liked: false,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471820",
    title: "Snowball Express",
    genre: { _id: "5b21ca3eeb7f6fbccd571702", name: "Comedy" },
    numberInStock: 7,
    liked: false,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "The Computer Wore Tennis Shoes",
    genre: { _id: "5b21ca3eeb7f6fbccd571702", name: "Comedy" },
    numberInStock: 7,
    liked: false,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471822",
    title: "Escape From Witch Mountain",
    genre: { _id: "5b21ca3eeb7f6fbccd571704", name: "Thriller" },
    numberInStock: 7,
    liked: false,
    dailyRentalRate: 4.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471823",
    title: "20,000 Leagues Under The Sea",
    genre: { _id: "5b21ca3eeb7f6fbccd571704", name: "Thriller" },
    numberInStock: 4,
    liked: false,
    dailyRentalRate: 3.5
  },
  {
    _id: "5b21ca3eeb7f6fbccd471824",
    title: "Zootopia",
    genre: { _id: "5b21ca3eeb7f6fbccd571703", name: "Drama" },
    numberInStock: 7,
    liked: false,
    dailyRentalRate: 3.5
  }
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find(m => m._id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find(m => m._id === movie._id) || {};
  movieInDb.name = movie.name;
  movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now();
    movies.push(movieInDb);
  }

  return movieInDb;
}

export function deleteMovie(id) {
  let movieInDb = movies.find(m => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  return movieInDb;
}

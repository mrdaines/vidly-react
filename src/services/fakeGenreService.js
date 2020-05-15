export const genres = [
  { _id: "5b21ca3eeb7f6fbccd571701", name: "Action" },
  { _id: "5b21ca3eeb7f6fbccd571702", name: "Comedy" },
  { _id: "5b21ca3eeb7f6fbccd571703", name: "Drama" },
  { _id: "5b21ca3eeb7f6fbccd571704", name: "Thriller" }
];

export function getGenres() {
  return genres.filter(g => g);
}

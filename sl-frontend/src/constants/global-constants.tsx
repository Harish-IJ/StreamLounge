export const API_BASE_URL = "https://api.themoviedb.org/3";

export const API_HEADERS = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
  },
};

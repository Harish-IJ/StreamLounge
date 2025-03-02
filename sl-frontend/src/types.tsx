export interface Movie {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  original_language: string;
  vote_count: number;
  adult: boolean;
  popularity: number;
  video: boolean;
}

export interface TVshow {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
  first_air_date: string;
  original_language: string;
  vote_count: number;
  adult: boolean;
  popularity: number;
  video: boolean;
}

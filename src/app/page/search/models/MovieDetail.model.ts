export interface MovieModel {
  id: number;
  adult: boolean;
  backdrop_path?: string;
  belongs_to_collection?: Belongs_to_collection;
  budget?: number;
  genres: Genre[];
  original_language: string;
  original_title: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  production_companies?: Production_company[];
  production_countries?: Production_country[];
  release_date: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: Spoken_language[];
  status?: string;
  tagline?: string;
  title: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  credits?: Credit;

}
export interface Belongs_to_collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Production_company {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface Production_country {
  iso_3166_1: string;
  name: string;
}

export interface Spoken_language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: any;
  credit_id: string;
  department: string;
  job: string;
}

export interface Credit {
  cast: Cast[];
  crew: Crew[];
}



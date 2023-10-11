import { MovieCardInfo } from "./MovieCardInfo.model";

export interface SearchMovieResponse {
  page: number,
  results: MovieCardInfo[],
  total_pages: number,
  total_results: number
}

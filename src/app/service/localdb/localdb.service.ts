import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieModel } from 'src/app/page/search/models/MovieDetail.model';
import { ApiResponse } from '../auth/auth.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LocaldbService {



  constructor(private http: HttpClient) { }

  saveMovie(m: MovieModel) {
    return this.http.post<ApiResponse>(environment.dockerBack+environment.localApiPaths.saveMovie, m);
  }

  getVideotek(id: string,p:number=0) {
    console.log(p);
    return this.http.get<ApiResponse>(environment.dockerBack + environment.localApiPaths.getMovie + id, {params:{'page':p}});
  }

  getMovieDetail(movieId: string) {
    const path = environment.dockerBack+environment.localApiPaths.getMovieDetail+movieId;
    return this.http.get<ApiResponse>(path);

  }

}

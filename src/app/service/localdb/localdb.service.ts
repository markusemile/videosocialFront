import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieModel } from 'src/app/page/search/models/MovieDetail.model';
import { ApiResponse } from '../auth/auth.service';
import { environment } from 'src/environments/environment.development';
import { tap } from 'rxjs';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class LocaldbService {



  constructor(private http: HttpClient) { }

  saveMovie(m: MovieModel) {
    return this.http.post<ApiResponse>(environment.dockerBack+environment.localApiPaths.saveMovie, m);
  }

  removeMovieFromMediatek(movieID:number){
    const path = environment.dockerBack+environment.localApiPaths.removeMovie;
    return this.http.post<ApiResponse>(path,null,{params:{movieID:movieID}});
  }

  getVideotek(p?:number,start?:number) {
    let queryParams = new HttpParams();
    if(p!==null && p!==undefined) queryParams=queryParams.append("page",p+"");
    if(start!==null && start!==undefined) queryParams=queryParams.append("start",start+"");

    return this.http.get<ApiResponse>(environment.dockerBack + environment.localApiPaths.getMediatek, {params:queryParams});
  }

  getMovie(id:number){
    return this.http.get<ApiResponse>(environment.dockerBack+environment.localApiPaths.getMovie+id)
  }

  getMovieDetail(movieId: string) {
    const path = environment.dockerBack+environment.localApiPaths.searchMovieDetail+movieId;
    return this.http.get<ApiResponse>(path);
  }

  searchMovie(queryP:HttpParams){
    const path = environment.dockerBack+environment.localApiPaths.searchMovie;
    return this.http.get<ApiResponse>(path,{params:queryP});
  }

  addToMediatek(userid:string,movieId:number){

    const queryParams = new HttpParams().set("userId", userid);

    const path = environment.dockerBack+environment.localApiPaths.addToMediatek;
    const pathWithVariable = path.replace("$1",movieId+"");

   return this.http.post<ApiResponse>(pathWithVariable,null,{params:queryParams});
    }

}

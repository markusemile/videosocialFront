import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppDataService, UserData } from '../appdata/app-data.service';
import { environment } from 'src/environments/environment.development';
import { SearchMovieResponse } from 'src/app/page/search/models/SearchMovieResponse.model';
import { MovieModel } from 'src/app/page/search/models/MovieDetail.model';

@Injectable({
  providedIn: 'root'
})
export class ThemoviedbService {

  basicParams: MdbApiOptions = {};

  constructor(
    private http: HttpClient,
    private userDatas: AppDataService
  ) {
    try {
      this.initBasicParam();
    } catch (error) {
      console.error(error);

    }

  }

  initBasicParam() {
    const datas: UserData = this.userDatas.getUserDatas();
    if (datas && this.basicParams) {
      this.basicParams.include_adult = datas.includeAdult;
      this.basicParams.language = datas.language;
    }
  }

  searchMovie(elem: HttpParams) {
    console.log(elem);

    if(elem.has("page") && elem.get("page")!==null){
      const p = elem.get('page');
      let intP=0;
      if(p!==null) intP=parseInt(p)+1;
      elem = elem.set('page',intP);
    }
    console.log(elem);
    return this.http.get<SearchMovieResponse>(environment.mdbApiPaths.searchMovie, { params: elem })
  }

  searchMovieDetail(id: number,append_to_response?:string) {
    let params = new HttpParams();
    for(const [key,value] of Object.entries(this.basicParams)){
     params=params.append(key,value);
    }
    if (append_to_response!=null) params=params.append('append_to_response',append_to_response);
    const p = {...this.basicParams };
    const pString = JSON.stringify(p);
    return this.http.get<MovieModel>(environment.mdbApiPaths.searchMovieDetail + "/" + id, {params})
  }


}

export interface MdbApiOptions {
  page?: number,
  query?: string,
  include_adult?: boolean,
  year?: number,
  language?: string,
  id?: number,
  append_to_response?:string,
  [key:string]:any,

}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ModelSearchResponse } from 'src/app/model/search.model';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ThemoviedbOrgService {

  constructor(private http: HttpClient) { }

  searchMovie(params: HttpParams) {
    return this.http.get<ModelSearchResponse>(environment.moviedb.api['searchMovie'].url, { params: params });
  }

}

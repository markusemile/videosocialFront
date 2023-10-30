import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RefreshTokenResponse } from 'src/app/security/headerInterceptor';
import { AppDataService, UserData } from '../appdata/app-data.service';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, max, throwError } from 'rxjs';
import { MovieCardInfo } from '../../page/search/models/MovieCardInfo.model';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  public connected = new BehaviorSubject<string>(this.userData.getToken());


  constructor(
    private http: HttpClient,
    private userData: AppDataService,
    private route: Router,

  ) {
  }




  ngAfterViewInit() {
    this.connected.asObservable().subscribe(res => {
      console.log(res);

    });
  }

  login(params: LoginRequest) {

    return this.http.post<ApiResponse>(environment.dockerBack+environment.localApiPaths.login, params).pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => "ERREUR !! : " + console.error)
      })
    ).subscribe((res) => {
      if (res.data && res.data.hasOwnProperty('token') && res.data.hasOwnProperty('refreshToken')) {

        this.userData.setToken(res.data.token)
        this.userData.connected.next(true);
        this.userData.setRefreshToken(res.data.refreshToken)

        const data: AuthResponse = res.data;
        if (data.blurAdultContent == null) data.blurAdultContent = false;
        if (data.includeAdult == null) data.includeAdult = false;
        if (data.language == null) data.language = navigator.language;

        const newU: UserData = {
          id: data.id,
          username: data.username,
          email: data.email,
          includeAdult: data.includeAdult,
          blurAdultContent: data.blurAdultContent,
          language: data.language
        };
        this.userData.setUserDatas(newU);

        this.route.navigate(['/videotek']);
      } else if (res.data && res.data.hasOwnProperty('status') && res.data.status === 'Error') {
        console.error("ERREUR : "+res);
        // modifier et mettre dans un toaster
      }
    })
  };



  register(form: { username: string, email: string, password1: string, password2: string }) {
    const params = { "username": form.username, "email": form.email, "password": form.password1, "group": 1 };
    return this.http.post<ApiResponse>(environment.dockerBack+environment.localApiPaths.register, params);
  }

  refreshToken(token: any) {
    return this.http.post<RefreshTokenResponse>(environment.dockerBack +environment.localApiPaths.refreshtoken, token);
  }

  isAuthenticate() {
    // console.log(this.authenticated.asObservable());

    // return this.authenticated.asObservable();
  }

  logout() {

  }


}
export interface AuthResponse {
  username: string,
  email: string,
  id: string,
  blurAdultContent: boolean,
  includeAdult: boolean,
  language: string,
  token: string,
  refreshtoken: string,
}



export interface ErrorResponse {
  code: number,
  message: string
}

export interface ApiResponse {
  time: string,
  message?: string,
  stats: string,
  data?: AuthResponse | ErrorResponse | MovieCardInfo | any
}

export interface LoginRequest {
  username: string,
  password: string
}

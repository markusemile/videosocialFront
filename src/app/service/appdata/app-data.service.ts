import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LocaldbService } from '../localdb/localdb.service';
import { ApiResponse } from '../auth/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {



  private userDatas: UserData | any;
  private token: string = '';
  private refreshToken: string = '';
  private history:string[]=[];
  private maxHistory:number=10;
  connected = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private cookieService: CookieService, private route: Router) {
    /**
     * if the userdata not exist into localstorage we make a empty storage otherwise we
     * catch the value into the localstorage and we fill it the userdata variables
     */
    if (!localStorage.getItem('user')) {
      localStorage.setItem('user', '');
    } else {
      this.parseStorageUserData();
      if (this.cookieService.get('mediatek.t')) this.setToken(this.cookieService.get('mediatek.t'));
      if (this.cookieService.get('mediatek.rt')) this.setRefreshToken(this.cookieService.get('mediatek.rt'));
    }
  }

  setHistory(url:string){
    if(this.history.length>this.maxHistory) this.history.shift();
    this.history.push(url);
  }
  getHistory(num:number){
    const url = this.history.pop();
    this.history.slice(0,-1);
    return url;
  }

  parseStorageUserData() {
    let d = localStorage.getItem('user');
    if (d) {
      const dParsed: UserData = JSON.parse(d);
      this.userDatas = dParsed;
    }
  }


  setUserDatas(values: UserData) {
    this.userDatas = values;
    this.saveStorage();
  }

  saveStorage() {
    localStorage.setItem('user', JSON.stringify(this.userDatas));
  }


  logout() {
    this.setToken('');
    this.setRefreshToken('');
    localStorage.clear();
    this.cookieService.deleteAll("/", 'mediatek.t')
    this.cookieService.deleteAll('mediatek.rt')
    this.connected.next(false);
    this.route.navigate(['/login']);
  }



  // GETTERS
  getToken() { return this.token; }

  getRefreshToken() { return this.refreshToken; }

  getUserDatas() { return this.userDatas };



  //SETTERS

  /**
   * update token and make a new cookie with 15 minutes of lifetime
   *
   * @params t  string (the token)
   * @return void
   */
  setToken(t: string) {
    this.token = t;
    const expirationMinute = 15;
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (expirationMinute * 60 * 1000));
    this.cookieService.set('mediatek.t', this.token, expirationDate, '/');
    this.connected.next(true);
  }

  /**
   * update refreshtoken and make a new cookie with 1 day of lifetime
   *
   * @param rt string (the refreshtoken)
   */
  setRefreshToken(rt: string) {
    if (rt !== this.refreshToken) {
      this.refreshToken = rt;
      const expirationDay = 1;
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getDay() + expirationDay);
      this.cookieService.set('mediatek.rt', rt);
    }
  }


  updateDatas(key: string, value: string) {

    if (this.userDatas && this.userDatas.hasOwnProperty(key)) {
      if (this.userDatas[key] !== value) {
        this.userDatas[key] = value;
      }
    }
    // update localstorage
    localStorage.setItem('user', JSON.stringify(this.userDatas));

    // update dbInfo
    const d: RequestUpdateInfo = {
      id: this.userDatas.id,
      username: this.userDatas.username,
      email: this.userDatas.email,
      includeAdult: this.userDatas.includeAdult,
      blurAdultContent: this.userDatas.blurAdultContent,
      language: this.userDatas.language
    }


    // update userData & refreshtoken into service
    this.token = (this.token !== this.cookieService.get('mediatek.t')) ? this.cookieService.get('mediatek.t') : this.token;
    this.refreshToken = (this.refreshToken !== this.cookieService.get('mediatek.rt')) ? this.cookieService.get('mediatek.rt') : this.refreshToken;
    this.userDatas = d;

    return this.http.post<ApiResponse>(environment.dockerBack+environment.localApiPaths.userUpdate, d);

  }








}

export interface UserData {
  // user infos
  username: string,
  id: string,
  email: string,
  language?: string,
  //app infos
  includeAdult: boolean,
  blurAdultContent: boolean
}

export interface RequestUpdateInfo {
  id: string,
  username: string,
  email: string,
  includeAdult: boolean,
  blurAdultContent: boolean,
  language: string
}

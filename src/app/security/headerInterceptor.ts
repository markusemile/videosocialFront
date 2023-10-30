import { HttpErrorResponse, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment.development";
import { CookieService } from 'ngx-cookie-service'
import { AppDataService } from "../service/appdata/app-data.service";
import { catchError, of, switchMap, take, throwError } from "rxjs";
import { ApiResponse, AuthService } from '../service/auth/auth.service';
import { Router } from "@angular/router";
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor {


  refreshTokenAttempts: number = 0;

  constructor(
    private cookieService: CookieService,
    private userData: AppDataService,
    private authService: AuthService,
    private route: Router,
    private messageService: MessageService) {




  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let headers = new HttpHeaders();
    //console.log(req);


    // change headers when goes to api external
    if (req.url.includes("https://api.themoviedb.org/")) {
      headers = headers.set('Authorization', 'Bearer ' + environment.mdbApiKey);
    }

    //change headers when goes to local db
    if (req.url.includes("api/user") || req.url.includes("api/movie") || req.url.includes("api/mediatek")) {
      headers = headers.set('Authorization', 'Bearer ' + this.userData.getToken());
    }

    const modifiedReq = req.clone({ headers });

    // manage server error/token error
    return next.handle(modifiedReq)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 403 && !req.url.includes('login')) {
            const rt = { "refreshToken": this.userData.getRefreshToken() }

            if (rt && this.refreshTokenAttempts < 2) {
              this.refreshTokenAttempts++;
              return this.authService.refreshToken(rt).pipe(
                take(1),
                switchMap((newTokenResponse: RefreshTokenResponse) => {
                  this.userData.setToken(newTokenResponse.token);
                  this.userData.setRefreshToken(newTokenResponse.refreshToken);
                  const newHeaders = headers.set('Authorization', 'Bearer ' + this.userData.getToken());
                  const newModifiedReq = req.clone({ headers: newHeaders });
                  return next.handle(newModifiedReq);
                }),
                catchError((error) => {
                  this.route.navigate(['/login']);
                  return throwError(() => error);
                })
              );
            }

          }
          if (error.status === 504) {
          }

          if (error.status === 404) {
            const mess: ApiResponse = error.error;
            this.messageService.add({ severity: "error", summary: "error", detail: mess.message });
            return of();
          }

          return throwError(() => error);
        })
      );
  }

  getValueOfCookie() {
    const value = this.cookieService.get('mediatek');
    return value;
  }

}

export interface RefreshTokenResponse {
  token: string,
  refreshToken: string
}

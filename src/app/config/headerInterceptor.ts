import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let headers = new HttpHeaders();

    if (req.url.includes("https://api.themoviedb.org/")) {
      headers = headers.set('Authorization', 'Bearer ' + environment.apikey);
      console.log(req);

    }

    const modifiedReq = req.clone({ headers });

    return next.handle(modifiedReq);
  }
  constructor() { }

}

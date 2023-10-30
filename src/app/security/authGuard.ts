import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";

import { AppDataService } from '../service/appdata/app-data.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard {


  constructor(
    private route: Router,
    private userData: AppDataService,
  ) {

   }



  canActivate() {
    // console.log(this.userData.getToken());
    // console.log(this.userData.getRefreshToken());

    if (this.userData.getToken() == "" && this.userData.getRefreshToken() == "") {
      this.route.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}



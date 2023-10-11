import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api'
import { AppDataService } from 'src/app/service/appdata/app-data.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  items: MenuItem[] | undefined;
  searchValue: string | undefined;


  _logged: boolean = false;

  @Input()
  set logged(value: boolean) {
    this._logged = value;
  }

  get logged(): boolean {
    return this._logged;
  }

  constructor(
    private route: Router,
    private authService: AuthService,
    private userDatas: AppDataService) {

    this.getItemsMenu();

  }




  goSearch(t: string) {
    console.log(t);

    this.route.navigate(['search'], { queryParams: { term: t } })
  }


  ngAfterViewInit() {
    this.userDatas.connected.asObservable().subscribe((res: boolean) => {
      this._logged = res;
      this.getItemsMenu();
    })
  }

  getItemsMenu() {
    return this.items = [
      {
        label: "Home",
        routerLink: "/home"
      }, {
        label: "VideoTek",
        routerLink: "videotek"
      }, {
        label: 'Profile',
        visible: this._logged,
        items: [
          {
            label: "My profile",
            routerLink: "profile"
          },
          {
            label: "logout",
            routerLink: "logout"

          }
        ]
      }
    ]
  }

}

import { Component } from '@angular/core';
import { AppDataService } from 'src/app/service/appdata/app-data.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private userData: AppDataService) { }

  ngOnInit() {
    this.userData.logout();
  }

}

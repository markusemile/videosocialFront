import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {


  keyword: string = "emile";

  items: MenuItem[] | undefined;

  ngOnInit(): void {

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-file',
        routerLink: ["/home"]
      },
      {
        label: 'My media-Tek',
        icon: 'pi pi-fw pi-pencil',
        routerLink: ["home/media-tek"],
      },
      {
        label: 'Prodil',
        icon: 'pi pi-fw pi-file',
        routerLink: ["home/profile"]
      }
    ];

  }

}

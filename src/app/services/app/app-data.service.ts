import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  private language: string = "fr_FR";
  private userId: number = 999999;

  constructor() { }

  public getLanguage() {
    return this.language;
  }
  public getUserId() {
    return this.userId;
  }

}

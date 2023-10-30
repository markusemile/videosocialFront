import { Component } from '@angular/core';
import { AppDataService, UserData } from 'src/app/service/appdata/app-data.service';
import { Language, LanguagesList } from './element/languageList';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from 'src/app/service/auth/auth.service';
import { Message, MessageService } from 'primeng/api';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],

})
export class ProfileComponent {

  userDatas: UserData | undefined;
  languages: PTreeSelectNode[] = [];
  private c: Language[];
  adultOptions: any[] = [{ label: "yes", value: true }, { label: "no", value: false }]
  blurAdultOptions: any[] = [{ label: "yes", value: true }, { label: "no", value: false }]


  form: FormGroup | undefined;

  constructor(
    private appData: AppDataService,
    private languageList: LanguagesList,
    private _fb: FormBuilder,
    private messageService: MessageService,
  ) {

    this.userDatas = appData.getUserDatas();
    this.c = languageList.getAllLanguage();
    this.form = this._fb.group({
      username: [this.userDatas?.username, [Validators.required]],
      email: [this.userDatas?.email, [Validators.email]],
      language: [''],
      includeAdult: [this.userDatas?.includeAdult],
      blurAdultContent: [this.userDatas?.blurAdultContent]
    })

    this.initLanguage();

  }


  initLanguage() {
    let indice = 1;
    this.c.forEach((langs: Language) => {
      let n: PTreeSelectNode = { key: "5", label: langs.english_name, data: langs.iso_639_1 };
      this.languages.push(n);
      indice++;
    })
    this.initFormLang();
  }


  initFormLang() {

    if (this.languages && this.languages.length > 0 && this.userDatas && this.userDatas.language) {
      const l = this.userDatas.language?.slice(0, 2);
      const index = this.languages.findIndex(k => k.data == l);

      if (this.form && this.form.get('language') && this.languages[index]) {
        this.form.get('language')?.setValue(this.languages[index]);
      }
    }
  }

  update(t: string, e: any) {


    let val: string;

    if (this.form && this.form.get(t)) {
      if (t == "language" && e.hasOwnProperty('data')) {
        const v: PTreeSelectNode = e;
        val = v.data + "-" + v.data.toUpperCase();
      } else {
        val = t;
      }

      this.appData.updateDatas(val, e).subscribe({
        next: (n: ApiResponse) => {
          if (n.stats?.includes('SUCCESS'))
            this.messageService.add({ severity: "success", summary: "success", detail: n.message });
          else
            this.messageService.add({ severity: "error", summary: "error", detail: n.message });
        }, error: (err: Error) => {
          this.messageService.add({ severity: "error", summary: "error", detail: err.message });
        }
      })
    }
  }



}

export interface PTreeSelectNode {
  key: string,
  label: string,
  data: string
}

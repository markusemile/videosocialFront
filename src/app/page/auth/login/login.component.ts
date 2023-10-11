import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppDataService } from 'src/app/service/appdata/app-data.service';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formgroup: FormGroup;

  constructor(
    private service: AuthService,
    private _fb: FormBuilder,
    private userData: AppDataService
  ) {

    this.formgroup = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  signup() {
    const values = this.formgroup.value;
    this.service.login(values);



  }



}

import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AppDataService } from 'src/app/service/appdata/app-data.service';
import { ApiResponse, AuthService } from 'src/app/service/auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formgroup: FormGroup;
  equal: boolean = false;

  formErrors: { username: string, email: string, password: string, equality: string } = {
    username: '',
    email: '',
    password: '',
    equality: ''
  }

  constructor(
    private service: AuthService,
    private _fb: FormBuilder,
    private userData: AppDataService,
    private messageService: MessageService
  ) {

    this.formgroup = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(24)]],
      password2: ['', [Validators.required]]
    }, { validators: [this.passwordVulnerability(), this.passwordsMatch(), this.usernameMatch()] })

  }



  signin() {
    const values = this.formgroup.value;
    this.service.register(values).subscribe({
      next: (res: ApiResponse) => {
        if (res.status?.includes('SUCCESS')) {
          this.messageService.add({ severity: "success", summary: "success", detail: res.message });
        }
      }, error: (err: Error) => {
        console.error("Registration Error : " + err.message)
      }
    });
  }

  ngOnInit() {
    this.formgroup.valueChanges.subscribe(v => {
      //username
      this.formErrors.username = ((this.formgroup.get('username')?.touched || this.formgroup.get('username')?.dirty) && this.formgroup.get('username')?.hasError('minlength') || this.formgroup.get('username')?.hasError('maxlength')) ? "Username must have at least 4 character and 20 max." : ''
      if (this.formErrors.username.length < 1)
        this.formErrors.username = (this.formgroup.get('username')?.value.length > 0 && this.formgroup?.errors?.['usernameRefused']) ? "Username cannot have a symbole" : "";
      // email
      this.formErrors.email = (this.formgroup.get('email')?.hasError('email')) ? "Email address not valid " : '';
      //password
      this.formErrors.password = (this.formgroup.get('password1')?.hasError('minlength') || this.formgroup.get('password1')?.hasError('maxlength')) ? "Password must have at least 6 character and 24 max" : "";
      if (this.formErrors.password.length < 1)
        this.formErrors.password = (this.formgroup?.errors?.['passwordVulnerability']) ? "Password must have at least 1 Uppercase Character and 1 digit" : '';
      // password equality
      this.formErrors.equality = (this.formgroup.get('password2')?.value.length > 0 && this.formgroup?.errors?.['passwordMismatch']) ? ' Confirmation of password failed !' : '';


    })
  }


  passwordsMatch(): any {
    return (formGroup: FormGroup): ValidationErrors | null => {
      if (formGroup) {
        const password1Control = formGroup.get('password1');
        const password2Control = formGroup.get('password2');

        if (password1Control && password2Control) {
          const val1 = password1Control.value;
          const val2 = password2Control.value;

          if (val1 !== null && val2 !== null) {
            if (val1 !== val2) {
              return { passwordMismatch: true }
            }
          }
        }
      }
      return null;
    };
  }
  passwordVulnerability(): any {
    return (c: AbstractControl): ValidationErrors | null => {
      if (c && c.get('password1') && c.get('password1')?.value) {
        const value = c.get('password1')?.value;
        let hasNumber = /\d/.test(value);
        let hasUpper = /[A-Z]/.test(value);
        let hasLower = /[a-z]/.test(value);
        const strong = hasNumber && hasUpper && hasLower;
        if (!strong) {
          return { passwordVulnerability: true }
        }
      }
      return null;
    }
  }

  usernameMatch(): any {
    return (c: AbstractControl): ValidationErrors | null => {
      if (c && c.get('username')) {
        const value = c.get('username')?.value;
        let isAlpha = /^[a-zA-Z0-9]+$/.test(value);
        if (!isAlpha && value.length > 0) {
          this.formErrors.username = "The username cannot contain a symbol"
          return { usernameRefused: true }
        }
      }

      return null;
    }
  }
}







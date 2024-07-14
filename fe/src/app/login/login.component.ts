import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../auth';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // [x: string]: any;
  public loginForm!: FormGroup;
  public loginFlag: boolean = false;
  public message: string = 'Login...';

  ngOnInit() {
    // form
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.email
      ]),
      pass: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),

    });
  }

  public onSubmit() {
    const user: User = {
      _id: undefined,
      name: '???',
      email: this.loginForm.get('email')?.value ?? '',
      password: this.loginForm.get('pass')?.value ?? '',
      author: undefined
    };
    this.loginFlag = true;
    this._loginService.singIn(user).subscribe(data => {
      // check status of response
      if (data) {
        this.message = 'Login successfully!';
        // Lưu thông tin đăng nhập vào localStorage
        localStorage.setItem('data', JSON.stringify(data));

        // delay 3s and redirect to home
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 3000);
      } else {
        this.message = 'Error login!';
        setTimeout(() => {
          this.loginFlag = false;
        }, 2000);
      }
    });
  }
  constructor(private router: Router, private _loginService: AuthService) { }

  public get email() {
    return this.loginForm.get('email');
  }

  public get pass() {
    return this.loginForm.get('pass');
  }
}

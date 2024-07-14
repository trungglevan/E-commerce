import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  [x: string]: any;
  public registerForm!: FormGroup;
  public registerFlag: boolean = false;
  public message: string = 'Register...';

  ngOnInit() {
    // form
    this.registerForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.email
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      pass: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      confirmPass: new FormControl('', [
        Validators.required,
        Validators.minLength(5),

      ]),
    });
  }

  // passwordMatchValidator(formGroup: FormGroup) {
  //   const password = formGroup.get('pass');
  //   const confirmPassword = formGroup.get('confirmPass');
  //   if (password && confirmPassword && password.value !== confirmPassword.value) {
  //     confirmPassword.setErrors({ passwordMismatch: true });
  //   } else {
  //     confirmPassword.setErrors(null);
  //   }
  // }

  constructor(private router: Router, private _registerService: AuthService) { }


  public onSubmit() {
    const user: User = {
      _id: undefined,
      email: this.registerForm.get('email')?.value ?? '',
      name: this.registerForm.get('name')?.value ?? '',
      password: this.registerForm.get('pass')?.value ?? '',
      author: "USER"
    };

    this.registerFlag = true;
    this._registerService.singUp(user).subscribe(data => {
      // check status of response
      if (data) {
        this.message = 'Register successfully!';
        // delay 3s and redirect to login
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      } else {
        this.message = 'Error register!';
        setTimeout(() => {
          this.registerFlag = false;
        }, 2000);
      }
    });
  }
  public get email() {
    return this.registerForm.get('email');
  }
  public get name() {
    return this.registerForm.get('name');
  }
  public get pass() {
    return this.registerForm.get('pass');
  }
  public get confirmPass() {
    return this.registerForm.get('confirmPass');
  }
}

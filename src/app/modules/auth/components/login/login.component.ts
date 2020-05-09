import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginUser, UserDetails } from '../../interfaces/auth.interfaces';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  loginForm: FormGroup;

  ngOnInit(): void {
    const loginUser: LoginUser = { username: '', password: '' };
    this.loginForm = this.fb.group(loginUser);
    this.loginForm.get('username').setValidators(Validators.required);
    this.loginForm.get('password').setValidators(Validators.required);
  }

  setCurrentUser(res) {
    const userDetails: UserDetails = {
      fullName: res.fullName,
      email: res.email,
    };
    this.auth.setCurrentUser(userDetails);
  }

  loginUser() {
    this.auth.loginUser(this.loginForm.value).subscribe(
      (res) => {
        console.log(res);
        this.auth.setToken(res.token);
        this.setCurrentUser(res);
        this.router.navigate(['/appointments']);
      },
      (err) => {
        if (err.error === 'invalid username') {
          this.loginForm.get('username').setErrors({ invalidUsername: true });
        } else if (err.error === 'invalid password') {
          this.loginForm.get('password').setErrors({ invalidPassword: true });
        }
      }
    );
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errMsg: string;

  constructor(
    private router: Router,
    private loginService: LoginService, fb: FormBuilder) {
    this.loginForm = fb.group({
      'username': [null, Validators.required],
      'password':[null, Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  ngOnInit() {
    this.loginService.logout();
  }

  submitForm(value: any):void{
    // console.log('Reactive form data: ');
    // console.log(value.username);
    this.loginService.login(value.username, value.password)
      .subscribe(result => {
        if (result == true) {
          this.router.navigate(['/home']);
        } else {
          this.errMsg = 'Username or password is incorrect';
        }
      })
  }

}

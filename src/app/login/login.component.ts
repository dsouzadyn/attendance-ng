import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.loginForm = fb.group({
      'username': [null, Validators.required],
      'password':[null, Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  ngOnInit() {
  }

  submitForm(value: any):void{
    console.log('Reactive form data: ');
    console.log(value);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../registration.service';

import { RegistrationHolder } from '../registrationholder';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;
  registration: RegistrationHolder;

  constructor(private registrationService: RegistrationService, fb: FormBuilder) {
    this.signUpForm = fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      'email': [null, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])]
    })
  }

  ngOnInit() {
  }

  submitForm(value: any): void {
    this.registrationService.registerUser(value).subscribe(
      registration => this.registration = registration,
      error => this.errorMessage = error,
    );
  }

}

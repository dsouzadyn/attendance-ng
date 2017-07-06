import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-defaulterselector',
  templateUrl: './defaulterselector.component.html',
  styleUrls: ['./defaulterselector.component.css']
})
export class DefaulterselectorComponent implements OnInit {

  selectorForm: FormGroup;
  errMsg: string;

  constructor(
    private router: Router,
    fb: FormBuilder
  ) {
    this.selectorForm = fb.group({
      'branch': [null, Validators.required],
    });
  }

  ngOnInit() {
  }

  submitForm(value: any): void {
    this.router.navigate(['/defaulter_records', value.branch, value.semester]);
  }

}

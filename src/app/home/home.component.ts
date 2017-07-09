import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttendanceHolder } from '../services/AttendanceHolder'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectorForm: FormGroup;
  errMsg: string;
  attendanceList: AttendanceHolder[];
  constructor(
    private router: Router,
    fb: FormBuilder
  ) {
    this.selectorForm = fb.group({
      'branch': [null, Validators.required],
      'semester': [null, Validators.required]
    });
  }

  ngOnInit() {

  }

  submitForm(value: any): void {
    this.router.navigate(['/records', value.branch, value.semester]);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-analyser-home',
  templateUrl: './analyser-home.component.html',
  styleUrls: ['./analyser-home.component.css']
})
export class AnalyserHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  viewInsights() {
    this.router.navigate(['/insights']);
  }

  viewCompare() {
    this.router.navigate(['/compare']);
  }

}

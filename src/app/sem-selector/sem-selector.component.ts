import { Component, OnInit } from '@angular/core';

import { Branch } from '../branch';
import { BranchServiceService } from '../branch-service.service';
@Component({
  selector: 'app-sem-selector',
  templateUrl: './sem-selector.component.html',
  styleUrls: ['./sem-selector.component.css'],
})
export class SemSelectorComponent implements OnInit {
  errorMessage: string;
  branches: Branch[];
  mode = 'Observable';

  constructor(private branchService: BranchServiceService) { }

  ngOnInit() {
    this.getBranches();
  }

  getBranches() {
    this.branchService.getBranches().subscribe(
      branches => this.branches = branches,
      error => this.errorMessage = error,
    );
  }


}

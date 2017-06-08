import { Component, OnInit } from '@angular/core';

import { RecordHolder } from '../recordholder';
import { RecordsServiceService } from '../records-service.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  // subjectList = [
  //     {'title': 'Applied Mathematics 4', 'sform': 'AM-IV', 'stype':1},
  //     {'title': 'Database Management Systems', 'sform': 'DBMS', 'stype':1},
  //     {'title': 'Computer Organisation and Architecture', 'sform': 'COA', 'stype':1},
  //     {'title': 'Computer Graphics', 'sform': 'CG', 'stype':1},
  //     {'title': 'Analysis of Algorithms', 'sform': 'AOA', 'stype':1},
  //     {'title': 'Theoratical Computer Science', 'sform': 'TCS', 'stype':2},
  // ];
  //
  errorMessage: string;
  subjectList: RecordHolder[];
  mode = 'Observable';
  semester: any;
  branch: any;
  constructor(private recordsService: RecordsServiceService) { }

  ngOnInit() {
    this.getSubjectHolders();
  }

  onSelect() {
    console.log(this.semester)
    console.log(this.branch)
  }

  getSubjectHolders() {
    this.recordsService.getSubjectHolders(1,4).subscribe(
      subjectList => this.subjectList = subjectList,
      error => this.errorMessage = error
    );
    console.log(this.subjectList);
  }

}

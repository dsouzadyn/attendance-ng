import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordHolder } from '../recordholder';
import { AttendanceHolder } from '../AttendanceHolder'
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
  attendanceList: AttendanceHolder[];
  semester: number;
  branch: number;
  sub: any;
  constructor(private recordsService: RecordsServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.branch = params['branch'];
      this.semester = params['semester'];
      this.getSubjectHolders(this.branch, this.semester);
      this.getAttendances(this.branch, this.semester);
    });
    //this.getSubjectHolders();
  }



  getSubjectHolders(branch: number, semester: number) {
    this.recordsService.getSubjectHolders(branch, semester).subscribe(
      subjectList => {

        this.subjectList = subjectList.sort(function (a, b) {
          var textA = a.subject.subject_name.toLowerCase();
          var textB = b.subject.subject_name.toLowerCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
      },
      error => this.errorMessage = error
    );
  }

  getAttendances(branch: number, semester: number) {
    this.recordsService.getAttendances(branch, semester).subscribe(
      attendanceList => {
        this.attendanceList = attendanceList;
        this.attendanceList.forEach((at: AttendanceHolder) => {
          at.subs = at["subs"].sort(function (a, b) {
            var textA = a.subject.subject_name.toLowerCase();
            var textB = b.subject.subject_name.toLowerCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          });
        });
      },
      error => this.errorMessage = error
    )
  }

  OnDestroy() {
    this.sub.unsubscribe()
  }

}

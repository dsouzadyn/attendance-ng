import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordHolder } from '../services/recordholder';
import { AttendanceHolder } from '../services/AttendanceHolder'
import { RecordsServiceService } from '../services/records-service.service';


@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})

export class RecordsComponent implements OnInit {


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
        console.log(subjectList);
        this.subjectList = subjectList.sort(function (a, b) {
          var textA = a.subject.subject_name.toLowerCase();
          var textB = b.subject.subject_name.toLowerCase();
          if (textA == 'extra') {
            return 1;
          }
          else if(textB == 'extra') {
            return 0;
          }
          else {
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
          }
        });
      },
      error => this.errorMessage = error
    );
  }

  getAttendances(branch: number, semester: number) {
    this.recordsService.getAttendances(branch, semester).subscribe(
      attendanceList => {
        this.attendanceList = attendanceList;

        for(var i = 0; i < this.attendanceList.length; i++) {
          this.attendanceList[i].subs = this.attendanceList[i].subs.sort(function (a, b) {

              var textA = a.subject.subject_name.toLowerCase();
              var textB = b.subject.subject_name.toLowerCase();
              if (textA == 'extra') {
                return 1;
              }
              else if(textB == 'extra') {
                return 0;
              }
              else {
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
              }
          });
        }
        // this.attendanceList.forEach((at: AttendanceHolder) => {
        //   at.subs = at.subs.sort(function (a, b) {
        //
        //     var textA = a.subject.subject_name.toLowerCase();
        //     var textB = b.subject.subject_name.toLowerCase();
        //     if(textB) {
        //       return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        //     }
        //     else {
        //       return 0;
        //     }
        //
        //   });
        // });

      },
      error => this.errorMessage = error
    )
  }

  OnDestroy() {
    this.sub.unsubscribe()
  }

}

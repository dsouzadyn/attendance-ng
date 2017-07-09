import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecordHolder } from '../services/recordholder';
import { AttendanceHolder } from '../services/AttendanceHolder'
import { RecordsServiceService } from '../services/records-service.service';

@Component({
  selector: 'app-defaulterrecords',
  templateUrl: './defaulterrecords.component.html',
  styleUrls: ['./defaulterrecords.component.css']
})
export class DefaulterrecordsComponent implements OnInit {

  errorMessage: string;
  subjectList: RecordHolder[];
  mode = 'Observable';
  attendanceList: AttendanceHolder[] = [];
  defaultersList: AttendanceHolder[] = [];
  semester: number;
  branch: number;
  sub: any;

  constructor(private recordsService: RecordsServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.branch = params['branch'];
      //this.getSubjectHolders(this.branch, 4);
      this.getAttendances(this.branch, 4);
      this.getAttendances(this.branch, 8);
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
        if (attendanceList.length != 0) {
          this.attendanceList.forEach((at: AttendanceHolder) => {
            at.subs = at["subs"].sort(function (a, b) {
              var textA = a.subject.subject_name.toLowerCase();
              var textB = b.subject.subject_name.toLowerCase();
              return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
          });
          let total = 0;
          let act = 0;
          this.defaultersList = this.defaultersList.concat(attendanceList.filter(function (at: AttendanceHolder) {
            at.subs = at["subs"];
            act = 0;
            total = 0;
            for (var i = 0; i < at["subs"].length; i++) {
              if(at["subs"][i].subject.sub_type == 1) {
                total += at["subs"][i].theory[0].total;
                total += at["subs"][i].practical[0].total;
                act += at["subs"][i].theory[0].actual;
                act += at["subs"][i].practical[0].actual;
              }
              if(at["subs"][i].subject.sub_type == 2) {
                total += at["subs"][i].theory[0].total;
                act += at["subs"][i].theory[0].actual;
              }
              if(at["subs"][i].subject.sub_type == 3) {
                total += at["subs"][i].practical[0].total;
                act += at["subs"][i].practical[0].actual;
              }
              if(at["subs"][i].subject.sub_type == 4) {
                if(at["subs"][i].theory[0].total != 0 && at["subs"][i].practical[0].total != 0) {
                  total += at["subs"][i].theory[0].total;
                  total += at["subs"][i].practical[0].total;
                  act += at["subs"][i].theory[0].actual;
                  act += at["subs"][i].practical[0].actual;
                }
              }
              if(at["subs"][i].subject.sub_type == 5) {

                 total += at["subs"][i].theory[0].total;
                 act += at["subs"][i].theory[0].actual;
              }

            }
            let per = act/total;
            if(per < 0.76) {
              console.log(per);
              return true;
            } else {
              return false;
            }
          }));

        }

      },
      error => this.errorMessage = error
    );
  }

  OnDestroy() {
    this.sub.unsubscribe()
  }


}

import { Component, OnInit } from '@angular/core';
import { RecordsServiceService } from '../services/records-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttendanceHolder } from '../services/AttendanceHolder'
@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {
  selectorForm: FormGroup;
  attendanceList: AttendanceHolder[] = [];
  errMsg: string;
  sub: any;
  constructor(
    private recordsService: RecordsServiceService,
    fb: FormBuilder
  ) {
    this.selectorForm = fb.group({
      'branch': [null, Validators.required],
      'semester': [null, Validators.required]
    });
  }

  ngOnInit() {
  }
  public lineChartData:Array<any> = [
    {data: [], label: 'Attendance Percentage'}
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';



  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  submitForm(value: any) {
    this.getAttendances(value.branch, value.semester);
  }
  getAttendances(branch: number, semester: number) {
    this.recordsService.getAttendances(branch, semester).subscribe(
      attendanceList => {
        let lineChartData = [];
        let labels = [];
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
          let count = 0;
          this.attendanceList.forEach(function (at: AttendanceHolder) {
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
            labels.push('');
            count++;
            lineChartData.push(Math.round(per*100));
          });
          this.lineChartData[0].data = lineChartData;
          this.lineChartLabels = labels;
        }

      },
      error => this.errMsg = error
    );
  }
  OnDestroy() {
    this.sub.unsubscribe()
  }

}

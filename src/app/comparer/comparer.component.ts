import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecordHolder } from '../services/recordholder';
import { AttendanceHolder } from '../services/AttendanceHolder'
import { RecordsServiceService } from '../services/records-service.service';

@Component({
  selector: 'app-comparer',
  templateUrl: './comparer.component.html',
  styleUrls: ['./comparer.component.css']
})

export class ComparerComponent implements OnInit {
  public radarChartLabelsOneTheory:string[] = [];
  public radarChartLabelsOnePracs:string[] = [];
  public radarChartLabelsTwoTheory:string[] = [];
  public radarChartLabelsTwoPracs:string[] = [];

  public radarChartOneTheory:any = [
    {data: [], label: 'Theory'}
  ];
  public radarChartOnePracs:any = [
    {data: [], label: 'Practicals'}
  ];
  public radarChartTwoTheory:any = [
    {data: [], label: 'Theory'}
  ];
  public radarChartTwoPracs:any = [
    {data: [], label: 'Practicals'}
  ];
  public radarChartType:string = 'radar';

  dataOneChange(at: AttendanceHolder) {
      if (at != null) {
        at.subs = at["subs"].sort(function (a, b) {
          var textA = a.subject.subject_name.toLowerCase();
          var textB = b.subject.subject_name.toLowerCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        let act = 0;
        let total = 0;
        this.radarChartLabelsOnePracs = [];
        this.radarChartLabelsOneTheory = [];
        this.radarChartOnePracs = [
          {data: [], label: 'Practicals'}
        ];
        this.radarChartOneTheory = [
          {data: [], label: 'Theory'}
        ];
        for (var i = 0; i < at["subs"].length; i++) {
          act = 0;
          total = 0;
          if(at["subs"][i].subject.sub_type == 1) {
            total += at["subs"][i].theory[0].total;
            act += at["subs"][i].theory[0].actual;
            this.radarChartLabelsOneTheory.push(at["subs"][i].subject.abbr)
            this.radarChartOneTheory[0].data.push(Math.round((act/total)*100));
            act = 0;
            total = 0;
            total += at["subs"][i].practical[0].total;
            act += at["subs"][i].practical[0].actual;
            this.radarChartLabelsOnePracs.push(at["subs"][i].subject.abbr)
            this.radarChartOnePracs[0].data.push(Math.round((act/total)*100));
          }
          if(at["subs"][i].subject.sub_type == 2) {
            total += at["subs"][i].theory[0].total;
            act += at["subs"][i].theory[0].actual;
            this.radarChartLabelsOneTheory.push(at["subs"][i].subject.abbr)
            this.radarChartOneTheory[0].data.push(Math.round((act/total)*100));
          }
          if(at["subs"][i].subject.sub_type == 3) {
            total += at["subs"][i].practical[0].total;
            act += at["subs"][i].practical[0].actual;
            this.radarChartLabelsOnePracs.push(at["subs"][i].subject.abbr);
            this.radarChartOnePracs[0].data.push(Math.round((act/total)*100));
          }
          if(at["subs"][i].subject.sub_type == 4) {
            if(at["subs"][i].theory[0].total != 0 && at["subs"][i].practical[0].total != 0) {
              total += at["subs"][i].theory[0].total;
              act += at["subs"][i].theory[0].actual;
              this.radarChartLabelsOneTheory.push(at["subs"][i].subject.abbr)
              this.radarChartOneTheory[0].data.push(Math.round((act/total)*100));
              total = 0;
              act = 0;
              total += at["subs"][i].practical[0].total;
              act += at["subs"][i].practical[0].actual;
              this.radarChartLabelsOnePracs.push(at["subs"][i].subject.abbr)
              this.radarChartOnePracs[0].data.push(Math.round((act/total)*100));
            }
          }
          if(at["subs"][i].subject.sub_type == 5) {

             total += at["subs"][i].theory[0].total;
             act += at["subs"][i].theory[0].actual;
             this.radarChartLabelsOneTheory.push(at["subs"][i].subject.abbr)
             this.radarChartOneTheory[0].data.push(Math.round((act/total)*100));
          }

        }
      }
  }

  dataTwoChange(at: AttendanceHolder) {
      if (at != null) {
        at.subs = at["subs"].sort(function (a, b) {
          var textA = a.subject.subject_name.toLowerCase();
          var textB = b.subject.subject_name.toLowerCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        let act = 0;
        let total = 0;
        this.radarChartLabelsTwoTheory = [];
        this.radarChartLabelsTwoPracs = [];
        this.radarChartTwoPracs = [
          {data: [], label: 'Practicals'}
        ];
        this.radarChartTwoTheory = [
          {data: [], label: 'Theory'}
        ];
        for (var i = 0; i < at["subs"].length; i++) {
          act = 0;
          total = 0;
          if(at["subs"][i].subject.sub_type == 1) {
            total += at["subs"][i].theory[0].total;
            act += at["subs"][i].theory[0].actual;
            this.radarChartLabelsTwoTheory.push(at["subs"][i].subject.abbr)
            this.radarChartTwoTheory[0].data.push(Math.round((act/total)*100));
            act = 0;
            total = 0;
            total += at["subs"][i].practical[0].total;
            act += at["subs"][i].practical[0].actual;
            this.radarChartLabelsTwoPracs.push(at["subs"][i].subject.abbr)
            this.radarChartTwoPracs[0].data.push(Math.round((act/total)*100));
          }
          if(at["subs"][i].subject.sub_type == 2) {
            total += at["subs"][i].theory[0].total;
            act += at["subs"][i].theory[0].actual;
            this.radarChartLabelsTwoTheory.push(at["subs"][i].subject.abbr)
            this.radarChartTwoTheory[0].data.push(Math.round((act/total)*100));
          }
          if(at["subs"][i].subject.sub_type == 3) {
            total += at["subs"][i].practical[0].total;
            act += at["subs"][i].practical[0].actual;
            this.radarChartLabelsTwoPracs.push(at["subs"][i].subject.abbr);
            this.radarChartTwoPracs[0].data.push(Math.round((act/total)*100));
          }
          if(at["subs"][i].subject.sub_type == 4) {
            if(at["subs"][i].theory[0].total != 0 && at["subs"][i].practical[0].total != 0) {
              total += at["subs"][i].theory[0].total;
              act += at["subs"][i].theory[0].actual;
              this.radarChartLabelsTwoTheory.push(at["subs"][i].subject.abbr)
              this.radarChartTwoTheory[0].data.push(Math.round((act/total)*100));
              total = 0;
              act = 0;
              total += at["subs"][i].practical[0].total;
              act += at["subs"][i].practical[0].actual;
              this.radarChartLabelsTwoPracs.push(at["subs"][i].subject.abbr)
              this.radarChartTwoPracs[0].data.push(Math.round((act/total)*100));
            }
          }
          if(at["subs"][i].subject.sub_type == 5) {

             total += at["subs"][i].theory[0].total;
             act += at["subs"][i].theory[0].actual;
             this.radarChartLabelsTwoTheory.push(at["subs"][i].subject.abbr)
             this.radarChartTwoTheory[0].data.push(Math.round((act/total)*100));
          }

        }
      }
  }


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  errorMessage: string;
  selectorForm: FormGroup;
  subjectList: RecordHolder[];
  mode = 'Observable';
  attendanceList: AttendanceHolder[];
  semester: number;
  branch: number;
  sub: any;
  selectedValOne = null;
  selectedValTwo = null;
  constructor(private recordsService: RecordsServiceService,
  private fb: FormBuilder) {
    this.selectorForm = fb.group({
      'branch': [null, Validators.required],
      'semester': [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  submitForm(value: any) {
    this.getAttendances(value.branch, value.semester);
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

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LoginService } from './login.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { RecordHolder } from './recordholder';
import { AttendanceHolder } from './AttendanceHolder';
import { APISettings } from './API.settings';

@Injectable()
export class RecordsServiceService {
  private subjectHolderBaseUrl;
  private attendaceBaseUrl;

  constructor(private http: Http, private authService: LoginService, private api: APISettings) {
     this.subjectHolderBaseUrl = this.api.baseUrl + '/api/subjectholder/';
     this.attendaceBaseUrl = this.api.baseUrl + '/api/attendance/';
  }

  getSubjectHolders(branch: number, semester: number): Observable<RecordHolder[]> {
    let headers = new Headers({'Authorization': 'JWT ' + this.authService.token });
    let options = new RequestOptions({ headers : headers });
    return this.http.get(this.subjectHolderBaseUrl + branch + '/' + semester + '/', options)
            .map(this.extractData).catch(this.handleError);
  }

  getAttendances(branch: number, semester: number): Observable<AttendanceHolder[]> {
    let headers = new Headers({'Authorization': 'JWT ' + this.authService.token });
    let options = new RequestOptions({ headers : headers });
    return this.http.get(this.attendaceBaseUrl + branch + '/' + semester + '/', options)
            .map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json()
    return body || { }
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if(error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = body.detail;
    } else {
      errMsg = `Something went terribly wrong, we're working to fix it!`;
    }
    return Observable.throw(errMsg);
  }

}

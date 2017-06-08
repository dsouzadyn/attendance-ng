import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { RecordHolder } from './recordholder';

@Injectable()
export class RecordsServiceService {

  private subjectHolderBaseUrl = 'http://localhost:8000/api/subjectholder/';

  constructor(private http: Http) { }

  getSubjectHolders(branch: number, semester: number): Observable<RecordHolder[]> {
    return this.http.get(this.subjectHolderBaseUrl + branch + '/' + semester + '/')
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
      errMsg = `Something went terrible wrong, we're working to fix it!`;
    } else {
      errMsg = `Something went terribly wrong, we're working to fix it!`;
    }
    return Observable.throw(errMsg);
  }

}

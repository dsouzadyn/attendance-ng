import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { Branch } from './branch';
import { APISettings } from './API.settings';

@Injectable()
export class BranchServiceService {

  private branchesUrl;

  constructor(private http: Http, private api: APISettings) {
     this.branchesUrl = this.api.baseUrl + '/api/branches/';
  }

  getBranches(): Observable<Branch[]> {
    return this.http.get(this.branchesUrl).map(this.extractData).catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if(error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      //errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      errMsg = `Something went terribly wrong, we're working to fix it!`;
    } else {
      errMsg = `Something went terribly wrong, we're working to fix it!`;
    }
    return Observable.throw(errMsg);
  }

}

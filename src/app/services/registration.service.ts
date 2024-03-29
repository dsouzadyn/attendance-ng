import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { RegistrationHolder } from './registrationholder';
import { APISettings } from './API.settings';
@Injectable()
export class RegistrationService {


  private registraionEndPoint;

  constructor(private http: Http, private api: APISettings) {
    this.registraionEndPoint = this.api.baseUrl + '/api/auth/register/';
  }

  registerUser(data: string): Observable<RegistrationHolder> {
    return this.http.post(this.registraionEndPoint, data)
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
      errMsg = `Something went terribly wrong, we're working to fix it!`;
    } else {
      errMsg = `Something went terribly wrong, we're working to fix it!`;
    }
    return Observable.throw(errMsg);
  }

}

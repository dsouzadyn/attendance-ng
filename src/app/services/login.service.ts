import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { APISettings } from './API.settings';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable()
export class LoginService {

  private loginEndpoint;
  public token: string;



  constructor(private http: Http, private jwtHelper: JwtHelper, private api: APISettings) {
    this.loginEndpoint = this.api.baseUrl +'/api/auth/login/';
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.loginEndpoint, JSON.stringify({ username: username, password: password }), options)
      .map((response: Response) => {
        let token = response.json() && response.json().token;
        if (token) {
          this.token = token;
          localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));
          return true;
        } else {
          return false;
        }
      });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn() {
    return this.token && !this.jwtHelper.isTokenExpired(this.token);
  }

}

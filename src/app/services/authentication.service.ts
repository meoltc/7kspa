import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { WebApiBaseService } from './webapi.base.service';

@Injectable()
export class AuthenticationService extends WebApiBaseService {
    constructor(http: Http) {
        super(http);
    }

    login(username: string, password: string) {

        var body = 'scope=&userName=' + username + '&password=' + encodeURIComponent(password) + '&grant_type=password&culture=';
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.BASE_API_URL + '/Token', body, { headers: headers })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.access_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    register(usrObj) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.BASE_API_URL + '/api/user/register', JSON.stringify(usrObj), { headers: headers })
            .map((response: Response) => {
                return response.json();
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
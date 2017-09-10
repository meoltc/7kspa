import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class WebApiBaseService {

    public BASE_API_URL: string = 'http://7kspatest.azurewebsites.net';

    //public BASE_API_URL: string = 'http://localhost:38775';

    //public BASE_API_URL: string = '';

    constructor(protected http: Http) { }

    m_appendAuthHeader() {
        var usr = JSON.parse(localStorage.getItem('currentUser'));
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + usr.access_token);
        return headers;
    }

    m_buildTree(all: any[], current, children: any[]) {
        current.children = (children || []);
        current.hasChildren = (current.children.length > 0);
        if (current.hasChildren) {
            current.children.forEach(p => this.m_buildTree(all, p, all.filter(x => x.parent_group == p.gid)));
        }
    }
}
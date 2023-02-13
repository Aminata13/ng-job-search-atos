import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:9008/api/v1/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'https://localhost:9008/api/v1/users/';
  private routePrefix: string = 'users';

  constructor(private http: HttpClient) { }

  findOneByUsername(username: string) {
    return this.http.get(this.getRoutePrefixWithSlash() + username + '/check');
  }

  private getRoutePrefixWithSlash(): string {
    return this.url + this.routePrefix + '/';
  }
}

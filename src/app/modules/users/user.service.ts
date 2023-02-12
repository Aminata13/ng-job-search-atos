import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'https://localhost:9000/api/v1/job-search/';
  private routePrefix: string = 'users';

  constructor(private http: HttpClient) { }

  findOneByUsername(username: string) {
    return this.http.get(this.getRoutePrefixWithSlash() + username + '/check');
  }

  private getRoutePrefixWithSlash(): string {
    return this.url + this.routePrefix + '/';
  }
}

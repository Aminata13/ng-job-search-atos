import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  url = 'https://localhost:9000/api/v1/job-search';

  private routePrefix: string = 'resumes';

  constructor(private http: HttpClient) { }

  findAll() {
    return this.http.get(this.getRoutePrefixWithSlash());
  }

  findOneById(id: string) {
    return this.http.get(this.getRoutePrefixWithSlash() + id);
  }

  create(resume: any) {
    return this.http.post(this.url + this.routePrefix, resume);
  }

  update(resume: any, id: string) {
    return this.http.put(this.getRoutePrefixWithSlash() + id, resume);
  }

  remove(id: string) {
    return this.http.delete(this.getRoutePrefixWithSlash() + id);
  }

  private getRoutePrefixWithSlash(): string {
    return this.url + this.routePrefix + '/';
  }
}

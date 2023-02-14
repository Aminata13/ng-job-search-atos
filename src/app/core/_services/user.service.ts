import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  
  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getJobseekerBoard(): Observable<any> {
    return this.http.get(API_URL + 'role=JOBSEEKER', { responseType: 'text' });
  }

  getRecruiterBoard(): Observable<any> {
    return this.http.get(API_URL + 'role=RECRUITER', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'role=ADMIN', { responseType: 'text' });
  }
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import * as moment from "moment";
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/modules/users/User.model';
import { tap, shareReplay } from "rxjs/operators";
import { UserService } from 'src/app/modules/users/user.service';

const AUTH_API = 'http://localhost:9008/api/auth/';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject!: BehaviorSubject<any>;
  public currentUser!: Observable<User>;

  constructor(private http: HttpClient, private router: Router, private userSrv: UserService) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
      // .pipe(tap(result => this.setSession(result)),
      //       shareReplay()
      // );
  }

  setSession(authResult: any) {

      const expiresAt = moment().add(authResult,'milliseconds');

      localStorage.setItem('token', authResult.token);
      localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );

      this.setCurrentUser();
  }

  logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("expires_at");
      localStorage.removeItem("currentUser");
      this.router.navigate(['login']);
  }

  public isAuthenticated(): boolean {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return true or false
    if (token == null) {
      return false;
    } else {
      return !helper.isTokenExpired(token);
    }
  }

  setCurrentUser() {
    const decodedToken: any = jwt_decode(localStorage.getItem("token")!);

    this.userSrv.findOneByUsername(decodedToken.username).subscribe(user => {
      localStorage.setItem('currentUser', JSON.stringify(user));
    });
  }

  public isLoggedIn() {
      return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getExpiration() {
      const expiration = localStorage.getItem("expires_at");
      const expiresAt = JSON.parse(expiration!);
      return moment(expiresAt);
  }

  register(firstname: string, lastname: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'register', {
      firstname,
      lastname,
      email,
      password
   }, httpOptions);
  }
  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}

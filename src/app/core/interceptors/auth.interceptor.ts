import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization'; 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const token = localStorage.getItem("token");
    // const loginUrl = 'https://127.0.0.1:9008/api/auth/login';

        // if (token && request.url != loginUrl) {
        //     const cloned = request.clone({
        //         headers: request.headers.set("Authorization",
        //             "Bearer " + token)
        //     });

        //     return next.handle(cloned);
        // }
        // else {
        //     return next.handle(request);
        // }

        let authReq = request;
        const token = this.token.getToken();
        if (token != null) {
          authReq = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
        }
        return next.handle(authReq);
      }
  }
  export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ];
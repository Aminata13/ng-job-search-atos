import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './interceptors/auth.interceptor';



@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    AuthInterceptor,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ]
})
export class CoreModule { }

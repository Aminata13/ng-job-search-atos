import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { JobOffersComponent } from './modules/job-offers/job-offers.component';
import { FormationComponent } from './modules/resume/formation/formation.component';
import { ResumeListComponent } from './modules/resume/resume-list/resume-list.component';
import { ResumeComponent } from './modules/resume/resume.component';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'homepage' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'homepage', component: JobOffersComponent },
  { path: 'formation', component: FormationComponent },
  { path: 'resume',
    component: ResumeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ResumeListComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './resume/resume.component';
import { JobOffersComponent } from './job-offers/job-offers.component';
import { ResumeListComponent } from './resume/resume-list/resume-list.component';



@NgModule({
  declarations: [
    ResumeComponent,
    JobOffersComponent,
    ResumeListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ModulesModule { }

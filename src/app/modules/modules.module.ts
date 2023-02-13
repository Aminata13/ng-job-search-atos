import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeComponent } from './resume/resume.component';
import { JobOffersComponent } from './job-offers/job-offers.component';
import { ResumeListComponent } from './resume/resume-list/resume-list.component';
import { FormationComponent } from './resume/formation/formation.component';
import { FormationListComponent } from './resume/formation/formation-list/formation-list.component';
import { MaterialModuleModule } from '../material-module.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SkillComponent } from './resume/skill/skill.component';
import { SkillListComponent } from './resume/skill/skill-list/skill-list.component';
import { ExperienceComponent } from './resume/experience/experience.component';
import { ExperienceListComponent } from './resume/experience/experience-list/experience-list.component';
import { HobbyComponent } from './resume/hobby/hobby.component';
import { HobbyListComponent } from './resume/hobby/hobby-list/hobby-list.component';
import { LangageComponent } from './resume/langage/langage.component';
import { LangageListComponent } from './resume/langage/langage-list/langage-list.component';
@NgModule({
  declarations: [
    ResumeComponent,
    JobOffersComponent,
    ResumeListComponent,
    FormationComponent,
    FormationListComponent,
    SkillComponent,
    SkillListComponent,
    ExperienceComponent,
    ExperienceListComponent,
    HobbyComponent,
    HobbyListComponent,
    LangageComponent,
    LangageListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModuleModule,
    ReactiveFormsModule
  ],
  exports:[
    ResumeComponent
  ]
})
export class ModulesModule { }

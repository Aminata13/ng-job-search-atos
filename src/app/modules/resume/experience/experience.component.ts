import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Experience } from './interface/experience.interface';
import { ExperienceService } from './interface/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  open = false;
  experience: Experience | null = null;
  experienceId: string | null = null;
  toUpdateExperience: Experience | null = null;
  modifButton= false;

  setStep1() {
    this.open = !this.open;
  }
  addExperience: FormGroup= new FormGroup({});
  constructor(
    private experienceService: ExperienceService,
    private router: Router,
  ) {
    
    this.initForm();
   }

   initForm(experience?: Experience) {
    this.addExperience = new FormGroup({
      function: new FormControl(experience? experience.function : "", [Validators.required, Validators.minLength(3)]),
      companyName: new FormControl(experience? experience.companyName : "", [Validators.minLength(3)]),
      realisation: new FormControl(experience? experience.realisation : "", [Validators.required, Validators.minLength(5)]),
      startDate: new FormControl(new Date(),[Validators.required]),
      endDate: new FormControl(new Date())
    });
  }

  public Error = (controlName: string, errorName: string) =>{
    return this.addExperience.controls[controlName].hasError(errorName);
  }
 
  submitForm() {
    if(!this.addExperience.valid) {
      return;
    }
    const experience = this.addExperience.value;
    console.log(experience)
    if(this.experienceId) {
      this.updateExperience(experience);
    } else {
      this.experienceService.createExperience(experience).subscribe(
        (result) => {
          this.router.navigate(["/resume"]);
        }
      )
    }
  }

  updateExperience(experience: Experience) {
    this.experienceService.updateExperience(this.experienceId, experience).subscribe(
      () => {
        this.router.navigate(["/resume"]);
      }
    )
  }

  getExperienceById(id : any){
    this.experienceId = id;
    if(this.experienceId) {
      this.experienceService.getExperienceById(this.experienceId).subscribe(
        (result) => {
          this.initForm(result as Experience);
        }
      )
    }
  }

  updateBefore(id: any){
    this.open= !this.open;
    this.modifButton=true;
    this.getExperienceById(id)
  } 
}

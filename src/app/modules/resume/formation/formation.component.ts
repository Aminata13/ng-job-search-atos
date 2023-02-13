import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Formation } from './interface/formation.interface';
import { FormationService } from './interface/formation.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent {
  step = false;
  formation: Formation | null = null;
  formationId: string | null = null;
  toUpdateFormation: Formation | null = null;
  modifButton= false;

  setStep() {
    this.step = !this.step;
  }
  addFormation: FormGroup= new FormGroup({});
  constructor(
    private formationService: FormationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    
    this.initForm();
   }

   initForm(formation?: Formation) {
    this.addFormation = new FormGroup({
      name: new FormControl(formation? formation.name : "", [Validators.required, Validators.minLength(7)]),
      degree: new FormControl(formation? formation.degree : "", [Validators.required, Validators.minLength(3)]),
      schoolName: new FormControl(formation? formation.schoolName : "", [Validators.required, Validators.minLength(5)]),
      schoolCity: new FormControl(formation? formation.schoolCity : "", [Validators.required, Validators.minLength(5)]),
      startDate: new FormControl(new Date(),[Validators.required]),
      endDate: new FormControl(new Date())
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.addFormation.controls[controlName].hasError(errorName);
  }
 
  submitForm() {
    if(!this.addFormation.valid) {
      return;
    }
    const formation = this.addFormation.value;
    console.log(formation)
    if(this.formationId) {
      this.updateFormation(formation);
    } else {
      this.formationService.createFormation(formation).subscribe(
        (result) => {
          this.router.navigate(["/resume"]);
        }
      )
    }
  }

  updateFormation(formation: Formation) {
    this.formationService.updateFormation(this.formationId, formation).subscribe(
      () => {
        this.router.navigate(["/resume"]);
      }
    )
  }

  getFormationById(id : any){
    this.formationId = id;
    if(this.formationId) {
      this.formationService.getFormationById(this.formationId).subscribe(
        (result) => {
          this.initForm(result as Formation);
        }
      )
    }
  }

  updateBefore(id: any){
    this.step= !this.step;
    this.modifButton=true;
    this.getFormationById(id)
  } 
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from './interface/skill.interface';
import { SkillService } from './interface/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent {
  stepskill = false;
  skill: Skill | null = null;
  skillId: string | null = null;
  toUpdateskill: Skill | null = null;
  modifButton= false;
  disabled = false;
  max = 5;
  min = 1;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 1;

  setStepskill() {
    this.stepskill = !this.stepskill;
  }
  addskill: FormGroup = new FormGroup({});
  constructor(
    private skillService: SkillService,
    private router: Router,
  ) {
    
    this.initForm();
   }

   initForm(skill?: Skill) {
    this.addskill = new FormGroup({
      name: new FormControl(skill? skill.name : "", [Validators.required, Validators.minLength(3)]),
      level: new FormControl(skill? skill.level : "", [Validators.required, Validators.minLength(1)]),
      
    });
  }

  public hasErrorskill = (controlName: string, errorName: string) =>{
    return this.addskill.controls[controlName].hasError(errorName);
  }
 
  submitForm() {
    if(!this.addskill.valid) {
      return;
    }
    const skill = this.addskill.value;
    console.log(skill)
    if(this.skillId) {
      this.updateskill(skill);
    } else {
      this.skillService.createSkill(skill).subscribe(
        (result) => {
          this.router.navigate(["/resume"]);
        }
      )
    }
  }

  updateskill(skill: Skill) {
    this.skillService.updateSkill(this.skillId, skill).subscribe(
      () => {
        this.router.navigate(["/resume"]);
      }
    )
  }

  getskillById(id : any){
    this.skillId = id;
    if(this.skillId) {
      this.skillService.getSkillById(this.skillId).subscribe(
        (result) => {
          this.initForm(result as Skill);
        }
      )
    }
  }

  updateBeforeskill(id: any){
    this.stepskill= !this.stepskill;
    this.modifButton=true;
    this.getskillById(id)
  } 

}

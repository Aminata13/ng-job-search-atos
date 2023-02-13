import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Langage } from './interface/langage.interface';
import { LangageService } from './interface/langage.service';

@Component({
  selector: 'app-langage',
  templateUrl: './langage.component.html',
  styleUrls: ['./langage.component.scss']
})
export class LangageComponent {

  toggledown = false;
  langage: Langage | null = null;
  langageId: string | null = null;
  toUpdateLangage: Langage | null = null;
  modifButton= false;
  

  stepStep() {
    this.toggledown = !this.toggledown;
  }
  addLangage: FormGroup= new FormGroup({});
  constructor(
    private langageService: LangageService,
    private router: Router,
  ) {
    
    this.initForm();
   }

   initForm(langage?: Langage) {
    this.addLangage = new FormGroup({
      name: new FormControl(langage? langage.name : "", [Validators.required, Validators.minLength(3)]),
      level: new FormControl(langage? langage.level : "", [ Validators.minLength(3)]),

    });
  }

  public ErrorLangage = (controlName: string, errorName: string) =>{
    return this.addLangage.controls[controlName].hasError(errorName);
  }
 
  submitForm() {
    if(!this.addLangage.valid) {
      return;
    }
    const langage = this.addLangage.value;
    console.log(langage)
    if(this.langageId) {
      this.updateLangage(langage);
    } else {
      this.langageService.createLangage(langage).subscribe(
        (result) => {
          this.router.navigate(["/resume"]);
        }
      )
    }
  }

  updateLangage(langage: Langage) {
    this.langageService.updateLangage(this.langageId, langage).subscribe(
      () => {
        this.router.navigate(["/resume"]);
      }
    )
  }

  getLangageById(id : any){
    this.langageId = id;
    if(this.langageId) {
      this.langageService.getLangageById(this.langageId).subscribe(
        (result) => {
          this.initForm(result as Langage);
        }
      )
    }
  }

  updateBefore(id: any){
    this.toggledown= !this.toggledown;
    this.modifButton=true;
    this.getLangageById(id)
  }
}

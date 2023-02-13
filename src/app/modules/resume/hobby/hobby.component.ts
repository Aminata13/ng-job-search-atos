import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hobby } from './interface/hobby.interface';
import { HobbyService } from './interface/hobby.service';

@Component({
  selector: 'app-hobby',
  templateUrl: './hobby.component.html',
  styleUrls: ['./hobby.component.scss']
})
export class HobbyComponent {

  toggle = false;
  hobby: Hobby | null = null;
  hobbyId: string | null = null;
  toUpdatehobby: Hobby | null = null;
  modifButton= false;

  setStephere() {
    this.toggle = !this.toggle;
  }
  addHobby: FormGroup= new FormGroup({});
  constructor(
    private hobbyService: HobbyService,
    private router: Router,
  ) {
    
    this.initForm();
   }

   initForm(hobby?: Hobby) {
    this.addHobby = new FormGroup({
      name: new FormControl(hobby? hobby.name : "", [Validators.required, Validators.minLength(3)]),
    });
  }

  public ErrorHobby = (controlName: string, errorName: string) =>{
    return this.addHobby.controls[controlName].hasError(errorName);
  }
 
  submitForm() {
    if(!this.addHobby.valid) {
      return;
    }
    const hobby = this.addHobby.value;
    console.log(hobby)
    if(this.hobbyId) {
      this.updateHobby(hobby);
    } else {
      this.hobbyService.createHobby(hobby).subscribe(
        (result) => {
          this.router.navigate(["/resume"]);
        }
      )
    }
  }

  updateHobby(hobby: Hobby) {
    this.hobbyService.updateHobby(this.hobbyId, hobby).subscribe(
      () => {
        this.router.navigate(["/resume"]);
      }
    )
  }

  getHobbyById(id : any){
    this.hobbyId = id;
    if(this.hobbyId) {
      this.hobbyService.getHobbyById(this.hobbyId).subscribe(
        (result) => {
          this.initForm(result as Hobby);
        }
      )
    }
  }

  updateBefore(id: any){
    this.toggle= !this.toggle;
    this.modifButton=true;
    this.getHobbyById(id)
  } 
}

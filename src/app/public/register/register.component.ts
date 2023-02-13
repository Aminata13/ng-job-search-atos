import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  roles = [
    { id: "JOBSSEKER", name: "Jobseeker" },
    { id: "RECRUITER", name: "Recruiter" }];

  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
  }

  register() {
    console.log(this.registerForm.value);
    // this.authService.register(this.registerForm.value).subscribe(
    //   (result: any) => {
    //     console.log({ result })
    //     this.authService.setSession((result as any).token);
    //     this.router.navigate(['/homepage']);
    //   }
    // );
  }
}

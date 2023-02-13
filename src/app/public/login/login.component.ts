import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup ;

  constructor(private authService: AuthService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    })
  }

  login() {
    this.authService.login(this.form.value).subscribe(
      (result: any) => {
        console.log({result})
        this.authService.setSession((result as any).token);
        this.router.navigate(['/homepage']);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  errors: any = null;
  roles: any = ['admin', 'pilot', 'passenger']
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private _snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: [''],
      role: [''],
    });
  }
  ngOnInit() {}
  onSubmit() {
    this.authService.register(this.registerForm.value).subscribe(
      () => {
        this.openSnackBar('Se ha registrado correctamente', undefined, 'snackbar') 
      },
      (error: any) => {
        this.errors = error.error;
      },
      () => {
        this.registerForm.reset();
        this.router.navigate(['login']);
      }
    );
  }
  openSnackBar(message: string, undefined: string | undefined, className: string) {
    this._snackBar.open(message, undefined, {
      duration: 2000,
      panelClass: [className]
    });
  }
}
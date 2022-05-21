import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/Services/auth.service';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  errors: any = null;
  constructor(
    public fb: FormBuilder,
    route: ActivatedRoute,
    public router: Router,
    public authService: AuthService
  ) {
    this.changePasswordForm = this.fb.group({
      email: [''],
      password: [''],
      password_confirmation: [''],
      passwordToken: [''],
    });
    route.queryParams.subscribe((params) => {
      this.changePasswordForm.controls['passwordToken'].setValue(
        params['token']
      );
    });
  }
  ngOnInit() {}
  onSubmit() {
    this.authService.resetPassword(this.changePasswordForm.value).subscribe(
      (result: any) => {
        alert('La contraseña se ha actualizado');
        this.changePasswordForm.reset();
        console.log(result)
      },
      (error: any) => {
        this.errors = error.error;
      }
    );
  }
 /*  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  } */
}

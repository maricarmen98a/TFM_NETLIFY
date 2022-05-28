import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    public authService: AuthService,
    private _snackBar: MatSnackBar
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
      () => {
        this.openSnackBar('Se ha actualizado correctamente', undefined, 'snackbar' )
        this.changePasswordForm.reset();
      },
      (error: any) => {
        this.errors = error.error;
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

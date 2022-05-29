import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../shared/Services/auth.service';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password-request',
  templateUrl: './change-password-request.component.html',
  styleUrls: ['./change-password-request.component.css']
})
export class ChangePasswordRequestComponent implements OnInit {
  resetForm: FormGroup;
  errors: any = null;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private location: Location,
    private _snackBar: MatSnackBar
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }
  ngOnInit(): void { }
  onSubmit(){
    this.authService.sendResetPasswordLink(this.resetForm.value).subscribe(
      (result) => {
        this.openSnackBar('Se ha enviado correctamente', undefined, 'snackbar' )
      },(error) => {
        this.errors = error.error;
      }, ()=> {
        this.resetForm.reset();
        this.errors = null

      })
  }
  back(): void {
    this.location.back()
  }
  openSnackBar(message: string, undefined: string | undefined, className: string) {
    this._snackBar.open(message, undefined, {
      duration: 2000,
      panelClass: [className]
    });
  }
}

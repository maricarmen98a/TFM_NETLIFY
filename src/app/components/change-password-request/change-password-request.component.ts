import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../shared/Services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-password-request',
  templateUrl: './change-password-request.component.html',
  styleUrls: ['./change-password-request.component.css']
})
export class ChangePasswordRequestComponent implements OnInit {
  resetForm: FormGroup;
  errors = null;
  successMsg: any = null;
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private location: Location
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }
  ngOnInit(): void { }
  onSubmit(){
    this.authService.sendResetPasswordLink(this.resetForm.value).subscribe(
      (result) => {
        this.successMsg = result;
      },(error) => {
        this.errors = error.error.message;
      })
  }
  back(): void {
    this.location.back()
  }
}

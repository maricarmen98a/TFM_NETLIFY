import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-help-form',
  templateUrl: './help-form.component.html',
  styleUrls: ['./help-form.component.css']
})
export class HelpFormComponent implements OnInit {
  mailForm!: FormGroup;
  submitted = false;
  email: FormControl;
  firstname: FormControl;
  textquery: FormControl;
  validateForm: boolean = false;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, public location: Location, private formBuilder: FormBuilder){
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.firstname = new FormControl('', Validators.required);
    this.textquery = new FormControl('', Validators.required);
    this.mailForm = this.formBuilder.group({
      email: this.email,
      firstname: this.firstname,
      textquery: this.textquery
    });
  }
  onSubmit() {
    this.validateForm = true;

    this.submitted = true;
    if (this.mailForm.invalid) {
      return;
    }
    if(this.submitted) {
      this.openSnackBar('Se ha enviado correctamente', undefined, 'snackbar' )
      var helpForm = new FormData();    
      helpForm.append('myUsername', this.mailForm.value.firstname);
      helpForm.append('myEmail', this.mailForm.value.email);
      helpForm.append('textquery', this.mailForm.value.textquery);
      return this.http.post('https://stark-sands-97153.herokuapp.com/api/send/email', helpForm).subscribe();
    }
  }
  ngOnInit() {}
  openSnackBar(message: string, undefined: string | undefined, className: string) {
    this._snackBar.open(message, undefined, {
      duration: 2000,
      panelClass: [className]
    });
  }
  back(): void {
    this.location.back()
  }
}

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoticeComponent } from 'src/app/shared/Components/notice/notice.component';

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
    if(this.submitted)
    {
      this.openSnackBar('Se ha enviado correctamente', undefined, 'snackbar' )
      var myFormData = new FormData();    
        myFormData.append('myUsername', this.mailForm.value.firstname);
        myFormData.append('myEmail', this.mailForm.value.email);
        myFormData.append('textquery', this.mailForm.value.textquery);

      return this.http.post('http://127.0.0.1:8000/api/send/email', myFormData).subscribe();
    }
  }
  ngOnInit() {
    /* this.mailForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    firstname: ['', [Validators.required]],
    textquery:['', [Validators.required]]
    }); */
  }
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

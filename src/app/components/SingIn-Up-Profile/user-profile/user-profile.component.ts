import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthStateService } from 'src/app/shared/Services/auth-state.service';
import { TokenService } from 'src/app/shared/Services/token.service';
import { AuthService } from '../../../shared/Services/auth.service';
export class User {
  name: any;
  email: any;
}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  UserProfile!: User;
  userForm: FormGroup;
  errors: any;
  constructor(public authService: AuthService, 
    public fb: FormBuilder, 
    public authState: AuthStateService, 
    private token: TokenService,
    ) {
    
    this.userForm = this.fb.group({
      name: [''],
      email: [''],
    });
  }
  ngOnInit() {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
    });
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
   update() {
    this.authService.updateUser(this.userForm.value).subscribe(
      (result: any) => {
        console.log(result);
      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.userForm.reset();
      }
    );
  }
  
  // Handle response
  responseHandler(data:any) {
    this.token.handleData(data.access_token);
  }
 
}


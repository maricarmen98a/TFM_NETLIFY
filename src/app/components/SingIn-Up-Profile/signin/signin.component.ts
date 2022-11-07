import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/Services/auth.service';
import { AuthStateService } from 'src/app/shared/Services/auth-state.service';
import { TokenService } from 'src/app/shared/Services/token.service';
import { FlightService } from 'src/app/shared/Services/flight.service';
import { FlightDTO } from 'src/app/Models/flight';
import { LocalStorageService } from 'src/app/shared/Services/local-storage.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  errors: any = null;
  flights!: FlightDTO[];
  usuario!: any;
  isLogin = false;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
    private token: TokenService,
    private authState: AuthStateService,
    public tokenService: TokenService,
    public flightService: FlightService,
    public local: LocalStorageService,
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }
  ngOnInit() {}
 
  onSubmit() {
    this.authService.signin(this.loginForm.value).subscribe(
      (result) => {
        this.responseHandler(result);
        console.log('result en login ' + result)
      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        this.authState.setAuthState(true);
        this.flightService.getFlight().subscribe((flights: FlightDTO[]) => {
          this.flights = flights
          this.local.setUsuario('flights', JSON.stringify(this.flights))
        });
        this.authService.profileUser().subscribe((data: any) => {
          this.usuario = data;
          this.local.setUsuario('usuario', JSON.stringify(this.usuario))
          console.log(this.usuario)
        });
        this.loginForm.reset();
        this.router.navigate(['profile']);
      }
    );
  }
  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true')
      this.isLogin = true;
    else
      this.isLogin = false;
    return this.isLogin;
  }
  responseHandler(data:any) {
    this.token.handleData(data.access_token);
    console.log('aqui esta el handledata de login mas el access token ' + data.access_token)
  }


}
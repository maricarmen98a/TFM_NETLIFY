import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class User {
  name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String;
}
export interface AuthToken {
  user_id: string;
  access_token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getAccessToken() {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}
  private isAuthenticated!: boolean;
 

  public isRouteAuthenticated():boolean{
    return this.isAuthenticated;
  }

  public setIsAuthenticated(isAuth:boolean):void{
    this.isAuthenticated = isAuth;
  }
  register(user: User): Observable<any> {
    return this.http.post('https://stark-sands-97153.herokuapp.com/api/auth/register', user);
  }
  signin(user: User): Observable<any> {
    return this.http.post<any>('https://stark-sands-97153.herokuapp.com/api/auth/login', user);
  }
  profileUser() {
    return this.http.get('https://stark-sands-97153.herokuapp.com/api/auth/user-profile');
  }
  updateUser( user: User): Observable<any> {
    return this.http.post<any>('https://stark-sands-97153.herokuapp.com/api/auth/user-profile', user);
  } 
  sendResetPasswordLink(data: any) {
    return this.http.post('https://stark-sands-97153.herokuapp.com/api/auth/reset-password-request', data)
  }
  resetPassword(data: any) {
    return this.http.post(
      'https://stark-sands-97153.herokuapp.com/api/auth/change-password',
      data
    );
  }
}

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
  baseUrl = 'https://stark-sands-97153.herokuapp.com/api/';
  getAccessToken() {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient) {}
  register(user: User): Observable<any> {
    return this.http.post(this.baseUrl + 'auth/register', user);
  }
  signin(user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'auth/login', user);
  }
  profileUser() {
    return this.http.get(this.baseUrl + 'auth/user-profile');
  }
  updateUser( user: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'auth/user-profile', user);
  } 
  sendResetPasswordLink(data: any) {
    return this.http.post(this.baseUrl + 'auth/reset-password-request', data)
  }
  resetPassword(data: any) {
    return this.http.post(this.baseUrl + 
      'auth/change-password',
      data
    );
  }
}
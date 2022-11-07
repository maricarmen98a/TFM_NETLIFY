import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private issuer = {
    login: 'https://stark-sands-97153.herokuapp.com/api/auth/login',
    register: 'https://stark-sands-97153.herokuapp.com/api/auth/register',
  };
  constructor() {}
  handleData(token: any) {
    localStorage.setItem('auth_token', token);
  }
  getToken() {
    return localStorage.getItem('auth_token');
  }
  isValidToken() {
    const token = this.getToken();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.issuer).indexOf(payload.iss) > -1
          ? true
          : false;
      }
    } else {
      return false;
    }
  }
  payload(token: any) {
    try{
      return jwt_decode<any>(token);
    }
    catch(Error){
      return null;
    }
  }
  isLoggedIn() {
    return this.isValidToken();
  }
  removeToken() {
    localStorage.removeItem('auth_token');
  }
}

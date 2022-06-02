import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserDTO } from 'src/app/Models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private backendApi: string;
  private controller: string;

  constructor(private http: HttpClient) {
    this.controller = 'users';
    this.backendApi = 'https://stark-sands-97153.herokuapp.com/api/auth/' + this.controller;
  }
  register(user: UserDTO): Observable<UserDTO> {
    return this.http
      .post<UserDTO>('https://stark-sands-97153.herokuapp.com/api/auth/register', user)
  }
  getUSerById(userId: string): Observable<UserDTO> {
    return this.http
      .get<UserDTO>(this.backendApi + '/' + userId)
  }
}

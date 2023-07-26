import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user!: User;

  constructor(private readonly http: HttpClient) {}


  getUser(username: string): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3000/trainers?username=${username}`);
  }

  postUser(newUser: User) {
    this.http.post<User>('http://localhost:3000/trainers', newUser).subscribe({
      next: (response) => {
        console.log(response, 'user created');
      },
      error: (error) => {
        console.log(error, 'user failed creation');
      },
    });
  }

  get user(): User {
    return this._user;
  }

  set user(val: User) {
    this._user = val;
  }
}

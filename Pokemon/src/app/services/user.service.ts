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

  postUser(newUser: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/trainers', newUser);
  }
  
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/trainers/${userId}`)
  }


  updateUser(user: User){
    return this.http.put(`http://localhost:3000/trainers/${user.id}`,user)
  }

  

  get user(): User {
    return this._user;
  }

  set user(val: User) {
    this._user = val;
  }
}

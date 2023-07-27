import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = environment.apiURL;
  private readonly apiKey = environment.apiKey;

  private _user!: User;

  constructor(private readonly http: HttpClient) {}

  getUser(username: string): Observable<User[]> {
    const headers = this.getHeaders();
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}`, { headers });
  }

  postUser(newUser: User): Observable<User> {
    const headers = this.getHeaders();
    return this.http.post<User>(this.apiUrl, newUser, { headers });
  }

  getUserById(userId: number): Observable<User> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<User>(url, { headers: this.getHeaders() });
  }

  updateUser(user: User) {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put(url, user, { headers: this.getHeaders() });
  }

  get user(): User {
    return this._user;
  }

  set user(val: User) {
    this._user = val;
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      "x-api-key": this.apiKey
    });
  }  
}

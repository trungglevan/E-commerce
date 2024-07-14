import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  auth: Observable<boolean> = this.authSubject.asObservable();

  constructor(private http: HttpClient) { }

  singIn(post: User): Observable<User[]> {
    return this.http.post<User[]>('http://localhost:3320/auth/login', post)
  }

  singUp(post: User): Observable<User> {
    return this.http.post<User>('http://localhost:3320/auth/register', post)
  }

  logout(): void {
    this.http.get('http://localhost:3320/auth/logout');
    return localStorage.removeItem('data');
  }

}

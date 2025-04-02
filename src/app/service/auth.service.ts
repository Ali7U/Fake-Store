import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User, UserProfile } from '../auth/user';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';

interface CredentialsResponse {
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  signedIn$ = new BehaviorSubject<boolean | null>(null);
  username$ = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }

  addUser(user: User) {
    return this.http.post<CredentialsResponse>(`${this.apiUrl}/users`, user);
  }

  updateUser(id: number, user: User) {
    return this.http.put(`${this.apiUrl}/users/${id}`, user);
  }

  emailAvailable(email: string) {
    return this.http.post<{ isAvailable: boolean }>(
      `${this.apiUrl}/users/is-available`,
      { email }
    );
  }

  login(credentials: any) {
    return this.http
      .post<CredentialsResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', `Bearer ${res.access_token}`);
          this.signedIn$.next(true);
        }),
        catchError(() => {
          this.signedIn$.next(false);
          return of(null);
        })
      );
  }

  checkProfile() {
    return this.http.get<UserProfile>(`${this.apiUrl}/auth/profile`).pipe(
      tap(({ name }) => {
        this.signedIn$.next(true);
        this.username$.next(name);
      }),
      catchError(() => {
        this.signedIn$.next(false);
        this.username$.next('');
        return of(null);
      })
    );
  }

  signout() {
    this.signedIn$.next(false);
    this.username$.next('');
    return localStorage.removeItem('token');
  }
}

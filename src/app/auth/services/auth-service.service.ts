import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { enviroments } from '../../../environments/enviroments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly baseUrl = enviroments.baseUrl;
  private user?: User;
  constructor(private readonly httpClient: HttpClient) { }

  get CurrentUser(): User | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(res => this.user = res),
        tap(res => localStorage.setItem('token', res.id.toString()))
      )
  }
  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }

  checkAuthenticator(): Observable<boolean> {
    if (!localStorage.getItem('token'))
      return of(false);
    const token = localStorage.getItem('token');
    return this.httpClient.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(res => this.user = res),
        map(user => !!user),
        catchError(err => of(false))
      )
  }
}
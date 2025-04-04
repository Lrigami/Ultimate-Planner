import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, catchError, tap, map, BehaviorSubject } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private authTokenKey = 'auth_token';
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
    private apiUrl = 'http://localhost:3000/auth';

    constructor(private http: HttpClient) {}

    // user management
    createUser(user: {email: string, password: string}): Observable<any> {
        return this.http.post(`${this.apiUrl}`, user);
    }

    // authentification
    isEmailTaken(email: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/emailverif`, { email }, {observe: 'response'}).pipe(
        tap(response => {
          if (response.status === 200) {
            this.isAuthenticatedSubject.next(false);
          }
        }),
        map((response) => response.status),
        catchError((error: HttpErrorResponse) => {
          return of(error.status);
        })
      )
    }

    login(email: string, password: string): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
          tap(response => {
            localStorage.setItem(this.authTokenKey, response.token);
            this.isAuthenticatedSubject.next(true);
          }),
          catchError((error) => {
            if (error.status === 401) {
              return of({ token: '' });
            }
            return of({ token: '' });
          })
        );
    }

    logout(): void {
        localStorage.removeItem(this.authTokenKey);
        this.isAuthenticatedSubject.next(false);
    }

    isAuthenticated(): Observable<boolean> {
        return this.isAuthenticatedSubject.asObservable();
    }

    getToken(): string | null {
        return localStorage.getItem(this.authTokenKey);
    }

    private hasToken(): boolean {
        return !!localStorage.getItem(this.authTokenKey);
    }

    // passwords
    forgotPassword(email: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/forgotpassword`, { email }).pipe(
        tap(() => {
          this.isAuthenticatedSubject.next(true);
        })
      )
    }

    resetPassword(token: string, password: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/resetpassword/${token}`, { password }).pipe(
        tap(() => {
          this.isAuthenticatedSubject.next(true);
        })
      )
    }
 }
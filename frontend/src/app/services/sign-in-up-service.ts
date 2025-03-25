import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

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

    login(email: string, password: string): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
          tap(response => {
            console.log("response: ", response);
            localStorage.setItem(this.authTokenKey, response.token);
            this.isAuthenticatedSubject.next(true);
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
}
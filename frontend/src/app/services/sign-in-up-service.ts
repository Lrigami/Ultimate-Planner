import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private authSubject = new BehaviorSubject<void>(null!);
    auth = this.authSubject.asObservable();
    private apiUrl = 'http://localhost:3000/auth';

    constructor(private http: HttpClient) {}

    createUser(user: {email: string, password: string}): Observable<any> {
        return this.http.post(`${this.apiUrl}`, user);
    }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TodolistService {
    private todolistSubject = new BehaviorSubject<void>(null!);
    todolistList$ = this.todolistSubject.asObservable(); // Pour la liste des to-do-lists plus tard
    private apiUrl = 'http://localhost:3000/todolist';

    constructor (private http: HttpClient) {}

    private getAuthHeaders() {
        const token = localStorage.getItem('auth_token'); 
        return new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
    }

    // to-do-lists
    getAllLists(): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.get<any>(`${this.apiUrl}`, { headers }).pipe(
            tap(() => {
                this.todolistSubject.next();
            })
        )
    }

    getList(id: number): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.get<any>(`${this.apiUrl}/${id}`, { headers }).pipe(
            tap(() => {
                this.todolistSubject.next();
            })
        )
    }

    getPinnedList(pinned: {isPinned: boolean}): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post<any>(`${this.apiUrl}/pinned`, pinned, { headers }).pipe(
            tap(() => {
                this.todolistSubject.next()
            })
        )
    }

    createList(list: {title: string, pinned: boolean, color: string}): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post<any>(this.apiUrl, list, { headers });
    }

    updateList(list: {id: number, title: string, pinned: boolean, color?: string}): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.put<any>(`${this.apiUrl}/${list.id}`, list, { headers }).pipe(
            tap(() => {
                this.todolistSubject.next();
            })
        )
    }

    deleteList(id: number): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers }).pipe(
            tap(() => {
                this.todolistSubject.next();
            })
        )
    }

    countTasksInList(id: number): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.get<any>(`${this.apiUrl}/${id}/total`, { headers }).pipe(
            tap(() => {
                this.todolistSubject.next();
            })
        )
    }

    countDoneTasksInList(id: number): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.get<any>(`${this.apiUrl}/${id}/done`, { headers }).pipe(
            tap(() => {
                this.todolistSubject.next();
            })
        )
    }

    updateTodolistOrder(sortOrder: {id: number, sort_order: number}[]): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post<any>(`${this.apiUrl}/sortOrder`, sortOrder, { headers }).pipe(
            tap(() => {
                this.todolistSubject.next();
            })
        )
    }
}
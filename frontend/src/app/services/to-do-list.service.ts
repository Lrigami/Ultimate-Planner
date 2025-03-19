import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TodolistService {
    private todolistSubject = new BehaviorSubject<void>(null!);
    todolistList$ = this.todolistSubject.asObservable(); // Pour la liste des to-do-lists plus tard
    private apiUrl = 'http://localhost:3000/todolist';

    constructor (private http: HttpClient) {}

    getAllLists(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}`).pipe(
            tap(() => {
                this.todolistSubject.next();
            })
        )
    }

    getList(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
            tap(() => {
                this.todolistSubject.next();
            })
        )
    }

    createList(list: {title: string, pinned: boolean, color: string}): Observable<any> {
        return this.http.post<any>(this.apiUrl, list);
    }

    updateList(list: {id: number, title: string, pinned: boolean, color: string}): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${list.id}`, list).pipe(
            tap(() => {
                this.todolistSubject.next();
            })
        )
    }

    deleteList(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
            tap(() => {
                this.todolistSubject.next();
            })
        )
    }

    countTasksInList(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}/total`).pipe(
            tap(() => {
                this.todolistSubject.next();
            })
        )
    }

    countDoneTasksInList(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}/done`).pipe(
            tap(() => {
                this.todolistSubject.next();
            })
        )
    }
}
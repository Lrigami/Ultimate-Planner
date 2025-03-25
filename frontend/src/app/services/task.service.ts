import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private taskListSubject = new BehaviorSubject<void>(null!);
    taskList$ = this.taskListSubject.asObservable();
    private baseUrl = 'http://localhost:3000';
    private apiUrl = `${this.baseUrl}`;

    constructor(private router: Router, private http: HttpClient) {}

    private getAuthHeaders() {
        const token = localStorage.getItem('auth_token'); 
        return new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
    }

    // tasks functions

    setTodolistId(): void {
        this.apiUrl = `${this.baseUrl}${this.router.url}`;
    }

    getAllTasks(): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.get<any>(`${this.apiUrl}/tasks`, { headers }).pipe(
            tap(() => {
                this.taskListSubject.next();
            })
        )
    }

    getTask(id: number): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.get<any>(`${this.apiUrl}/tasks/${id}`, { headers }).pipe(
            tap(() => {
                this.taskListSubject.next();
            })
        )
    }

    createTask(task: {title: string, description?: string, due_date?: Date, priority?: string, kanban_category?: string, done?: boolean}): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post<any>(`${this.apiUrl}/tasks`, task, { headers });
    }

    updateTask(task: {id: number, title: string, description?: string, due_date?: Date, priority?: string, kanban_category?: string, done?: boolean}): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.put<any>(`${this.apiUrl}/tasks/${task.id}`, task, { headers }).pipe(
            tap(() => {  
                this.taskListSubject.next();
            })
        );
    }

    deleteTask(id: number): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.delete<any>(`${this.apiUrl}/tasks/${id}`, { headers }).pipe(
            tap(() => {
                this.taskListSubject.next();
            })
        )
    }

    filterTask(filters: {priority: Array<any>, operator: string, duedate: Array<any>}): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post<any>(`${this.apiUrl}/tasks/filter`, filters, { headers }).pipe(
            tap(() => {
                this.taskListSubject.next();
            })
        )
    }

    // enums

    getAllKanban() {
        const headers = this.getAuthHeaders();
        return this.http.get<string[]>(`${this.baseUrl}/enums/kanban`, { headers }).pipe(
            tap(() => {
                this.taskListSubject.next();
            })
        )
    }

    getAllPriority() {
        const headers = this.getAuthHeaders();
        return this.http.get<string[]>(`${this.baseUrl}/enums/priority`, { headers }).pipe(
            tap(() => {
                this.taskListSubject.next();
            })
        )
    }
}
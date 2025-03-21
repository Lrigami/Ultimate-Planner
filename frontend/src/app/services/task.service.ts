import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private taskListSubject = new BehaviorSubject<void>(null!);
    taskList$ = this.taskListSubject.asObservable();
    private apiUrl = 'http://localhost:3000/1/tasks';
    private apiUrlKanban = 'http://localhost:3000/kanban';

    constructor(private http: HttpClient) {}

    getAllTasks(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}`).pipe(
            tap(() => {
                this.taskListSubject.next();
            })
        )
    }

    getTask(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
            tap(() => {
                this.taskListSubject.next();
            })
        )
    }

    createTask(task: {title: string, description?: string, due_date?: Date, priority?: string, kanban_category?: string, done?: boolean}): Observable<any> {
        return this.http.post<any>(this.apiUrl, task);
    }

    updateTask(task: {id: number, title: string, description?: string, due_date?: Date, priority?: string, kanban_category?: string, done?: boolean}): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${task.id}`, task).pipe(
            tap(() => {  
                this.taskListSubject.next();
            })
        );
    }

    deleteTask(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
            tap(() => {
                this.taskListSubject.next();
            })
        )
    }

    // kanban_category 

    getAllKanban() {
        return this.http.get<string[]>(`${this.apiUrlKanban}`).pipe(
            tap(() => {
                this.taskListSubject.next();
            })
        )
    }
}
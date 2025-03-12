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

    getAllTasks() {
        return this.http.get<any>(`${this.apiUrl}`).pipe(
            tap(() => {
                this.taskListSubject.next();
            })
        )
    }

    getTask(id: number) {
        return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
            tap(() => {
                this.taskListSubject.next();
            })
        )
    }

    // Est-ce que ça suffit ou est-ce que s'il manque un paramètre, cela posera problème pour la création de données dans le back ? 
    createTask(task: {title: string, description?: string, dueDate?: Date, priority?: string, kanban?: string, done?: boolean}): Observable<any> {
        return this.http.post<any>(this.apiUrl, task);
    }

    checkTask(task: {id: number, done: boolean}): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${task.id}`, task).pipe(
            tap(() => {
                this.taskListSubject.next();
            })
        )
    }

    updateTask(task: {id: number, title: string, description?: string, dueDate?: Date, priority?: string, kanban?: string, done?: boolean}): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${task.id}`, task).pipe(
            tap(() => {
                this.taskListSubject.next();
            })
        );
    }

    deleteTask(id: number) {
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
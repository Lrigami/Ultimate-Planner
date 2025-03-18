import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private todolistSubject = new BehaviorSubject<void>(null!);
    todolistList$ = this.todolistSubject.asObservable(); // Pour la liste des to-do-lists plus tard
    private apiUrl = 'http://localhost:3000/todolists';

    constructor (private http: HttpClient) {}

    getAllLists() {

    }

    getList() {

    }

    createList() {

    }

    updateList() {

    }

    deleteList() {

    }
}
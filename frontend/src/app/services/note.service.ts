import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class NoteService {
    private NoteListSubject = new BehaviorSubject<void>(null!);
    NoteList$ = this.NoteListSubject.asObservable();
    private apiUrl = 'http://localhost:3000/notes';

    constructor(private http: HttpClient) {}

    private getAuthHeaders() {
        const token = localStorage.getItem('auth_token'); 
        return new HttpHeaders({
            Authorization: `Bearer ${token}`
        });
    }

    getAllNotes(): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.get<any>(`${this.apiUrl}`, { headers }).pipe(
            tap(() => {
                this.NoteListSubject.next();
            })
        )
    }

    getPinnedNotes(pinned: {isPinned: boolean}): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post<any>(`${this.apiUrl}/pinned`, pinned, { headers }).pipe(
            tap(() => {
                this.NoteListSubject.next();
            })
        )
    }

    createNote(note: {title?: string, body: string, color: string, pinned: boolean}): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post<any>(this.apiUrl, note, { headers });
    }

    updateNote(note: {id: number, title?: string, body: string, color: string, pinned: boolean}): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.put<any>(`${this.apiUrl}/${note.id}`, note, { headers }).pipe(
            tap(() => {
                this.NoteListSubject.next();
            })
        )
    }

    deleteNote(id: number): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers }).pipe(
            tap(() => {
                this.NoteListSubject.next();
            })
        )
    }

    updateNotesOrder(sortOrder: {id: number, sort_order: number}[]): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post<any>(`${this.apiUrl}/sortOrder`, sortOrder, { headers }).pipe(
            tap(() => {
                this.NoteListSubject.next();
            })
        )
    }
}
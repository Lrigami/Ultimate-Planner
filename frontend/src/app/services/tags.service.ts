import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Tag } from '../models/tag.model';

@Injectable({
    providedIn: 'root',
})
export class TagService {
    private tagListSubject = new BehaviorSubject<void>(null!);
    taskList$ = this.tagListSubject.asObservable();
    private apiUrl = 'http://localhost:3000/tags';

    constructor(private http: HttpClient) {}

    private getAuthHeaders() {
      const token = localStorage.getItem('auth_token'); 
      return new HttpHeaders({
          Authorization: `Bearer ${token}`
      });
    }

    createTag(tag: {name: string, color: string}): 
    Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.post<any>(this.apiUrl, tag, { headers }).pipe(
        tap(() => {
            this.tagListSubject.next();
        })
      );
    }

    getAllTags():Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.get<any>(this.apiUrl, { headers }).pipe(
        tap(() => {
          this.tagListSubject.next();
        })
      )
    }

    updateTag(tag: {id: number, name: string, color: string}): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.put<any>(`${this.apiUrl}/${tag.id}`, tag, { headers }).pipe(
        tap(() => {
          this.tagListSubject.next();
        })
      )
    }

    deleteTag(id: number): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers }).pipe(
        tap(() => {
          this.tagListSubject.next();
        })
      )
    }

    assignTagToTask(link: {tagId: number, taskId: number}): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.post<any>(`${this.apiUrl}/assign`, link, { headers }).pipe(
        tap(() => {
          this.tagListSubject.next();
        })
      )
    }

    getTagFromTask(taskId: number): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.post<{retreivedTags: Tag[]}>(`${this.apiUrl}/retreive`, {taskId}, {headers}).pipe(
        map(response => response.retreivedTags || []),
        tap(() => {
          this.tagListSubject.next();
        })
      )
    }

    removeTagFromTask(taskId: number): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.post<any>(`${this.apiUrl}/remove`, {taskId}, {headers}).pipe(
        tap(() => {
          this.tagListSubject.next();
        })
      )
    }

}
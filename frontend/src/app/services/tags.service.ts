import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

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

    createTag(tag: {title: string, color: string}): 
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

    updateTag(tag: {id: number, title: string, color: string}): Observable<any> {
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

    removeTagFromTask(link: {tagId: number, taskId: number}): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.post<any>(`${this.apiUrl}/remove`, link, {headers}).pipe(
        tap(() => {
          this.tagListSubject.next();
        })
      )
    }

}
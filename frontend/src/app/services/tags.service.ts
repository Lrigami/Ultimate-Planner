import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class TagService {
    private tagListSubject = new BehaviorSubject<void>(null!);
    taskList$ = this.tagListSubject.asObservable();
    private apiUrl = 'http://localhost:3000/api/tags';

    constructor(private http: HttpClient) {}

    createTag(tag: {title: string, color: string}): Observable<any> {
        return this.http.post<any>(this.apiUrl, tag).pipe(
          tap(() => {
              this.tagListSubject.next();
          })
        );
      }

}
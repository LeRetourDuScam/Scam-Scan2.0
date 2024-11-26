import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/api/comment';

  constructor(private http: HttpClient) {}

  addComment(comment: any): Observable<any> {
    return this.http.post(this.apiUrl, comment);
  }

  getComments(mangaId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${mangaId}`);
  }
  replyToComment(reply:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reply`, reply);
  }
  
}
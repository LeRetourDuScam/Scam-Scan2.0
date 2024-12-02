import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private apiUrl = 'http://localhost:3000/api/view';

  constructor(private http: HttpClient) {}

  addView(Slug: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { Slug });
  }

  getView(Slug: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${Slug}`);
  }
}
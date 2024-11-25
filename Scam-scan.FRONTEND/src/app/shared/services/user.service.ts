import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/user'; 

  constructor(private http: HttpClient, private router: Router) { }

  AddToFavoris(mangaSlug: string, userId: string): Observable<HttpStatusCode> {
    return this.http.post<HttpStatusCode>(`${this.apiUrl}/favoritesManga/${userId}`, 
      {manga:mangaSlug});
  }

  deleteFavoris(userId:any,slug: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/favoritesManga/${userId}`,{body:{manga:slug}});
  }
  GetFavoris(userId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/favoritesManga/${userId}`);
  }
}
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/user'; 

  constructor(private http: HttpClient,private router:Router) { }

  AddToFavoris(mangaSlug:any,userId:any) : Observable<HttpStatusCode> {
    return this.http.post<HttpStatusCode>(this.apiUrl+'/favoritesManga/'+userId,mangaSlug)
  }
  deleteFavoris(slug: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${slug}`);
  }
}

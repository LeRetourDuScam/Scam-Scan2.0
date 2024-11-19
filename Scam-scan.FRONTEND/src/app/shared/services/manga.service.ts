import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manga, MangaGet } from '../models/manga.model';
import { MangaParams } from '../params/manga-params';
import { generateUrl } from '../helpers/generate-url.helper';
@Injectable({
  providedIn: 'root'
})
export class MangaService {
  private apiUrl = 'http://localhost:3000/api/mangas';

  constructor(private http: HttpClient) { }

  // Get all mangas
  getMangas(MangaParams:MangaParams): Observable<MangaGet> {
    const url= generateUrl(`${this.apiUrl}?`,MangaParams)
    return this.http.get<MangaGet>(url);
  }

  // Get manga by slug
  getMangaBySlug(slug: string): Observable<Manga> {
    return this.http.get<Manga>(`${this.apiUrl}/slug/${slug}`);
  }

  // Create a new manga
  createManga(manga: any): Observable<HttpStatusCode> {
    return this.http.post<HttpStatusCode>(this.apiUrl, manga);
  }

  // Update a manga by slug
  updateManga(slug: string, manga: any): Observable<Manga> {
    return this.http.put<Manga>(`${this.apiUrl}/slug/${slug}`, manga);
  }

  // Delete a manga by slug
  deleteManga(slug: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/slug/${slug}`);
  }
  searchMangas(term: string): Observable<Manga> {
    return this.http.get<Manga>(`${this.apiUrl}/search?q=${term}`);
  }

}

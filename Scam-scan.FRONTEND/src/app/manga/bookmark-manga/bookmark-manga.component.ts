import { Component, Input, OnInit } from '@angular/core';
import { MangaService } from '../../shared/services/manga.service';
import { Manga } from '../../shared/models/manga.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-bookmark-manga',
  templateUrl: './bookmark-manga.component.html',
  styleUrls: ['./bookmark-manga.component.scss']
})
export class BookmarkMangaComponent {
    username: string | null = null;
    public mangas: Manga[] = [];
    public FavoritesMangaList: string[] = [];
  
  
    constructor(
      private mangaService: MangaService,
      private authService: AuthService,
      private user: UserService
    ) {
    }
  
    ngOnInit(): void {
      this.getAllFavorites();
    }
    getMangaBySlug(): void {
      this.FavoritesMangaList.forEach(slug => {
        this.mangaService.getMangaBySlug(slug).subscribe(res => {
          this.mangas.push(res);
      });
    });
  }
  
    getAllFavorites(){
      this.username = this.authService.getUsernameFromToken();
      if(this.username){
        this.user.GetFavoris(this.username).subscribe(res=>{
          this.FavoritesMangaList = res;
          this.refreshManga();
        })
      }
    }
  
    getLastChapters(manga: Manga) {
      return manga.chapters.slice(-3);
    }
  
    refreshManga() {
      this.getMangaBySlug();
    }
  }
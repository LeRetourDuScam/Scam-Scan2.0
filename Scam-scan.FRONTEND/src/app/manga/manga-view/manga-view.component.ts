import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MangaService } from '../../shared/services/manga.service';
import { Manga } from '../../shared/models/manga.model';
import { MatTableDataSource } from '@angular/material/table';
import { Chapter } from 'src/app/shared/models/chapter.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
@Component({
  selector: 'app-manga-view',
  templateUrl: './manga-view.component.html',
  styleUrls: ['./manga-view.component.scss']
})
export class MangaViewComponent implements OnInit {
  slug: string | null = null;
  userId: string | null = null;
  FavoritesMangaList:string[] =[];
  public manga: Manga | undefined;
  displayedColumns: string[] = ['No', 'chapter', 'updated_at'];
  dataSource: MatTableDataSource<Chapter> = new MatTableDataSource<Chapter>([]);
  
  constructor(private route: ActivatedRoute,
              private mangaService: MangaService,
              public authService: AuthService,
              private user: UserService,
              private snackbarService:SnackbarService) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    if (this.slug) {
      this.loadManga(this.slug);
    }
  }

  loadManga(slug: any): void {
    this.mangaService.getMangaBySlug(slug).subscribe(data => {
      this.manga = data;
      this.dataSource = new MatTableDataSource<Chapter>(data.chapters);
    });
  }

  addtoFavoris(mangaSlug: any): void {
    this.userId = this.authService.getUsernameFromToken();
    if (this.userId) {
      this.user.AddToFavoris(mangaSlug, this.userId).subscribe(res => {
        this.snackbarService.addedBookmark();
      });
    }
  }
  IsBookmarked(mangaSlug:any):void{
    this.userId = this.authService.getUsernameFromToken();
    if (this.userId) {
      this.user.GetFavoris(this.userId).subscribe(res=>{
        if(res.includes(mangaSlug)){
          this.user.deleteFavoris(this.userId,mangaSlug).subscribe(res => {
            this.snackbarService.deletedBookmark();
          });
        }
        else{
          this.addtoFavoris(mangaSlug);
        }     
       })
    }
  }
}
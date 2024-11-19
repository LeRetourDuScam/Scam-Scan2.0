import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MangaService } from '../shared/services/manga.service';
import { Manga } from '../shared/models/manga.model';
import { MatDialog } from '@angular/material/dialog';
import { Chapter } from '../shared/models/chapter.model';
import { SnackbarService } from '../shared/services/snackbar.service';
import { mangaParams } from 'src/app/shared/params/manga-params.const';
import { MangaParams } from 'src/app/shared/params/manga-params';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit{
  @Input() defaultMangaParams!: MangaParams;

  public MangaParams!: MangaParams;
  public mangas: Manga[] = [];


  countMangas: number = 0;
  countPage: number = 0;

  constructor(
    private mangaService: MangaService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
  ) {
  }

  ngOnInit(): void {
    this.MangaParams = { ...mangaParams };
    this.refreshManga();
  }

  GetAllMangas(): void {
    this.mangaService.getMangas(this.MangaParams).subscribe(res => {
      this.mangas = res.data;
      this.countMangas = res.count;
    });
  }

  getLastChapters(manga: Manga) {
    return manga.chapters.slice(-3);
  }

  // Pagination
  hasPreviousPage(): boolean {
    return this.MangaParams.pageNumber > 1;
  }

  hasNextPage(): boolean {
    return this.MangaParams.pageNumber < Math.ceil(this.countMangas / this.MangaParams.pageSize);
  }

  previousPage(): void {
    if (this.hasPreviousPage()) {
      this.MangaParams.pageNumber--;
      this.GetAllMangas();
    }
  }

  nextPage(): void {
    if (this.hasNextPage()) {
      this.MangaParams.pageNumber++;
      this.GetAllMangas();
    }
  }

  refreshManga() {
    this.MangaParams.pageNumber = 1;
    this.GetAllMangas();
  }
}

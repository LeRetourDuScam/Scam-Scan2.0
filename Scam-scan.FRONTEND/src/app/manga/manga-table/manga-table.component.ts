import { Component, Input, OnInit } from '@angular/core';
import { MangaService } from '../../shared/services/manga.service';
import { Manga } from '../../shared/models/manga.model';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { mangaParams } from 'src/app/shared/params/manga-params.const';
import { MangaParams } from 'src/app/shared/params/manga-params';
import { FormControl } from '@angular/forms';
import { Status } from 'src/app/shared/enums/status.enum';
import { Types } from 'src/app/shared/enums/types.enum';
import { Genres } from 'src/app/shared/enums/genres.enum';
import { Languages } from 'src/app/shared/enums/languages.enum';

@Component({
  selector: 'app-manga-table',
  templateUrl: './manga-table.component.html',
  styleUrls: ['./manga-table.component.scss']
})
export class MangaTableComponent implements OnInit {
  @Input() defaultMangaParams!: MangaParams;

  public MangaParams!: MangaParams;
  public mangas: Manga[] = [];
  public years: number[] = [];

  countMangas: number = 0;
  countPage: number = 0;
  isExpanded = false;

  public authorControl = new FormControl();
  public ratingControl = new FormControl();
  public publicationYearControl = new FormControl();


  public statusControl = new FormControl();
  public typeControl = new FormControl();
  public genreControl = new FormControl();
  public languageControl = new FormControl();

  StatusEnum = Object.values(Status);
  TypesEnum = Object.values(Types);
  GenresEnum = Object.values(Genres);
  LanguagesEnum = Object.values(Languages);

  constructor(
    private mangaService: MangaService,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.MangaParams = { ...mangaParams };
    this.generateYears();
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

  handleChange(event: any, param: keyof MangaParams, control: FormControl) {
    if (event.target.value) {
      const value = event.target.value.trim();
      if (value) {
        (this.MangaParams as any)[param] = value;
        this.refreshManga();
      }
    } else {
      this.cleanParam(param, control);
    }
  }

  cleanParam(param: keyof MangaParams, control: FormControl) {
    control.reset();
    (this.MangaParams as any)[param] = '';
    this.refreshManga();
  }

  toggleExpandable() {
    this.isExpanded = !this.isExpanded;
  }

  generateYears(): number[] {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1930; year--) {
      this.years.push(year);
    }
    return this.years;
  }


  refreshManga() {
    this.MangaParams.pageNumber = 1;
    this.GetAllMangas();
  }
}

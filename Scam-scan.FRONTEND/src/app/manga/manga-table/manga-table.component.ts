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

  isExpanded = {
    status: false,
    types: false,
    genres: false,
    languages: false,
    ratings:false
  };

  public MangaParams!: MangaParams;
  public mangas: Manga[] = [];

  countMangas: number = 0;
  countPage: number = 0;

  public statusControl = new FormControl();
  public typeControl = new FormControl();
  public genreControl = new FormControl();
  public languageControl = new FormControl();

  StatusEnum = Object.values(Status);
  TypesEnum = Object.values(Types);
  GenresEnum = Object.values(Genres);
  LanguagesEnum = Object.values(Languages);

  constructor(
    private mangaService: MangaService
  ) {}

  ngOnInit(): void {
    this.MangaParams = { ...mangaParams };
    this.refreshManga();
  }
  
  // requete API
  GetAllMangas(): void {
    this.mangaService.getMangas(this.MangaParams).subscribe(res => {
      this.mangas = res.data;
      this.countMangas = res.count;
    });
  }

  refreshManga() {
    this.MangaParams.pageNumber = 1;
    this.GetAllMangas();
  }

  // Pagination
  getLastChapters(manga: Manga) {
    return manga.chapters.slice(-3);
  }

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

  // Filter
  handleCheckboxChange(event: Event, param: keyof MangaParams) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
  
    if (checkbox.checked) {
      (this.MangaParams[param] as string[]).push(value);
    } else {
      const paramArray = this.MangaParams[param] as string[];
      const index = paramArray.indexOf(value);
      if (index > -1) {
        paramArray.splice(index, 1);
      }
    }
    this.refreshManga();
  }


  toggleSection(section: keyof typeof this.isExpanded) {
    this.isExpanded[section] = !this.isExpanded[section];
  }
}

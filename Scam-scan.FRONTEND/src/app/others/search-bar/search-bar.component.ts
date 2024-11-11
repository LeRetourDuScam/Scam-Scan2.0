import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import {Manga } from 'src/app/shared/models/manga.model';
import { MangaService } from 'src/app/shared/services/manga.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit{
  public filteredMangas: Manga[] = [];
  public searchForm: FormGroup;
  clickListener: any;
  isFocused = false;

  constructor(
    private mangaService: MangaService,
    private fb: FormBuilder,
  ) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  ngOnInit(): void {
    this.filteredMangas = [];
    this.searchForm.get('searchTerm')?.valueChanges.subscribe((term: string) => {
      this.onSearch(term);
    });
  
  }

  onSearch(term: string): void {
    if (term.length >= 3) {
      this.mangaService.searchMangas(term).subscribe((data: any) => {
        this.filteredMangas = data;
      });
    } else {
      this.filteredMangas = [];
    }
  }

  onLinkClick(url:any): void {
    this.filteredMangas = [];
    this.searchForm.get('searchTerm')?.setValue('');
    window.location.href = url;
  }
}

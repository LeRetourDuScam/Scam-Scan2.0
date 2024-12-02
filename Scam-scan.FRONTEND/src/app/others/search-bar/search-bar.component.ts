import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Manga } from 'src/app/shared/models/manga.model';
import { MangaService } from 'src/app/shared/services/manga.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  public filteredMangas: Manga[] = [];
  public searchForm: FormGroup;

  constructor(
    private mangaService: MangaService,
    private fb: FormBuilder,
    private eRef: ElementRef,
    private renderer: Renderer2,
    private router: Router
  ) {
    this.searchForm = this.fb.group({
      searchTerm: ['']
    });
  }

  ngOnInit(): void {
    this.filteredMangas = [];
    this.searchForm.get('searchTerm')?.valueChanges
      .pipe(debounceTime(300))
      .subscribe((term: string) => {
        this.onSearch(term);
      });

    this.renderer.listen('window', 'click', (e: Event) => {
      if (!this.eRef.nativeElement.contains(e.target)) {
        this.filteredMangas = [];
      }
    });

    this.router.events.subscribe(() => {
      this.filteredMangas = [];
      this.searchForm.get('searchTerm')?.setValue('');
    });
  }

  onSearch(term: string): void {
    if (term.length >= 1) {
      this.mangaService.searchMangas(term).subscribe((data: any) => {
        this.filteredMangas = data;
      });
    } else {
      this.filteredMangas = [];
    }
  }

  onLinkClick(url: string): void {
    this.filteredMangas = [];
    this.searchForm.get('searchTerm')?.setValue('');
    this.router.navigateByUrl(url);
  }
}
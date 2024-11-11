import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Chapter } from 'src/app/shared/models/chapter.model';
import { Manga } from 'src/app/shared/models/manga.model';
import { MangaService } from 'src/app/shared/services/manga.service';

@Component({
  selector: 'app-chapter-view',
  templateUrl: './chapter-view.component.html',
  styleUrls: ['./chapter-view.component.scss']
})
export class ChapterViewComponent implements OnInit {
  slug: string | null = null;
  chapterSlug: string | null = null;
  public manga: Manga | undefined;
  public chapter: Chapter | undefined;
  public currentChapterIndex: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mangaService: MangaService
  ) {}

  ngOnInit(): void {
    // Observer les changements de paramètres de route
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.chapterSlug = params['chapter'];
      if (this.slug) {
        this.loadManga(this.slug);
        
      }
    });
  }

  loadManga(slug: string): void {
    this.mangaService.getMangaBySlug(slug).subscribe((data) => {
      this.manga = data;
      this.currentChapterIndex = data.chapters.findIndex((x) => x.slug === this.chapterSlug);
      this.chapter = data.chapters[this.currentChapterIndex];
    });
  }

  hasPreviousChapter(): boolean {
    return this.currentChapterIndex !== undefined && 
            this.currentChapterIndex > 0;
  }

  hasNextChapter(): boolean {
    return (
      this.currentChapterIndex !== undefined &&
      this.manga !== undefined &&
      this.currentChapterIndex < this.manga.chapters.length - 1
    );
  }

  previousChapter(): void {
    if (this.hasPreviousChapter()) {
      this.navigateToChapter(this.currentChapterIndex! - 1);
    }
  }

  nextChapter(): void {
    if (this.hasNextChapter()) {
      this.navigateToChapter(this.currentChapterIndex! + 1);
    }
  }

  goToChapter(event: Event): void {
    const chapterSlug = (event.target as HTMLSelectElement).value;
    const index = this.manga?.chapters.findIndex(chap => chap.slug === chapterSlug);
    if (index !== undefined && index !== -1) {
      this.navigateToChapter(index);
    }
  }

  private navigateToChapter(index: number): void {
    if (this.manga) {
      const targetChapter = this.manga.chapters[index];
      const url = `/manga/view/${this.slug}/chapter/${targetChapter.slug}`;
    
      window.location.href = url;
    }
  }
}

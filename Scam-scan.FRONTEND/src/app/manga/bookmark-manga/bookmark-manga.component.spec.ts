import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkMangaComponent } from './bookmark-manga.component';

describe('BookmarkMangaComponent', () => {
  let component: BookmarkMangaComponent;
  let fixture: ComponentFixture<BookmarkMangaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkMangaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

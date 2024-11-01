import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateMangaComponent } from './dialog-create-manga.component';

describe('DialogCreateMangaComponent', () => {
  let component: DialogCreateMangaComponent;
  let fixture: ComponentFixture<DialogCreateMangaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DialogCreateMangaComponent]
    });
    fixture = TestBed.createComponent(DialogCreateMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

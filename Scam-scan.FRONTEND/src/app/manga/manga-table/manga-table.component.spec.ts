import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaTableComponent } from './manga-table.component';

describe('MangaTableComponent', () => {
  let component: MangaTableComponent;
  let fixture: ComponentFixture<MangaTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MangaTableComponent]
    });
    fixture = TestBed.createComponent(MangaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

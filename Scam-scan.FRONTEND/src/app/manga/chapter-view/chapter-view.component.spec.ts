import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterViewComponent } from './chapter-view.component';

describe('ChapterViewComponent', () => {
  let component: ChapterViewComponent;
  let fixture: ComponentFixture<ChapterViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChapterViewComponent]
    });
    fixture = TestBed.createComponent(ChapterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

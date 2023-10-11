import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailTemplateComponent } from './movie-detail-template.component';

describe('MovieDetailTemplateComponent', () => {
  let component: MovieDetailTemplateComponent;
  let fixture: ComponentFixture<MovieDetailTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieDetailTemplateComponent]
    });
    fixture = TestBed.createComponent(MovieDetailTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

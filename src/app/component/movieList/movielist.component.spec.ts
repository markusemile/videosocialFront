import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovielistComponent } from './movielist.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { RouterTestingModule } from "@angular/router/testing"

describe('MovielistComponent', () => {
  let component: MovielistComponent;
  let fixture: ComponentFixture<MovielistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        PaginatorModule,
        ButtonModule,
        RouterTestingModule
      ],
      declarations: [MovielistComponent, MovieCardComponent]
    });
    fixture = TestBed.createComponent(MovielistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

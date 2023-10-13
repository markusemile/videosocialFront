import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailTemplateComponent } from './movie-detail-template.component';
import {RouterTestingModule} from '@angular/router/testing'
import { HttpClientModule } from '@angular/common/http';

describe('MovieDetailTemplateComponent', () => {
  let component: MovieDetailTemplateComponent;
  let fixture: ComponentFixture<MovieDetailTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({imports:[
      RouterTestingModule,
      HttpClientModule
    ],
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

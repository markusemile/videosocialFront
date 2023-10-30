import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FilterComponent } from 'src/app/component/filter/filter.component';

import { MovielistComponent } from 'src/app/component/movieList/movielist.component';
import { MovieCardComponent } from 'src/app/component/movieList/movie-card/movie-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TreeSelectModule } from 'primeng/treeselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule} from 'primeng/paginator'

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        ButtonModule,
        TreeSelectModule,
        SelectButtonModule,
        ToastModule,
        PaginatorModule

      ],
      declarations: [
        SearchComponent,
        FilterComponent,
        MovielistComponent,
        MovieCardComponent],
      providers: [
        MessageService
      ]
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, Input, Output, EventEmitter, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { ModelSearchMovieModel } from 'src/app/model/search.movie.response.model';
import { ModelSearchResponse } from '../../model/search.model';
import { PageEvent } from 'src/app/model/pagination.model';
import { PaginatorState } from 'primeng/paginator';




@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.scss']
})
export class MovielistComponent {

  movies!: ModelSearchMovieModel[];
  pagination: PageEvent = { first: 0, rows: 20, page: 0, pageCount: 0 };

  @Input() page!: ModelSearchResponse | null;

  constructor(private cdr: ChangeDetectorRef) { }

  @Output("changepage") changePage: EventEmitter<number> = new EventEmitter();


  ngOnInit() {
    this.getMovieListFromPage();
  }

  getMovieListFromPage() {
    if (this.page !== undefined && this.page !== null) {
      if (this.page.results !== undefined && this.page.results.length > 0) {
        this.movies = this.page.results;
      }
      this.pagination.first = 0;
      this.pagination.page = this.page.page;
      this.pagination.pageCount = this.page.total_results;
    }
  }

  onPageChange(event: PaginatorState) {
    this.cdr.detectChanges();
    this.changePage.emit(event.page);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['page'] && this.page !== undefined && this.page != null) {
      this.page = changes['page'].currentValue;
      this.getMovieListFromPage();
    }
  }

}


import { Component, Input, Output, Renderer2, EventEmitter, ChangeDetectorRef, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { ModelSearchMovieModel } from 'src/app/model/search.movie.response.model';
import { ModelSearchResponse } from '../../model/search.model';
import { PageEvent } from 'src/app/model/pagination.model';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { ScrollPanelModule } from 'primeng/scrollpanel';





@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.scss']
})
export class MovielistComponent {

  movies!: ModelSearchMovieModel[];
  pagination: PageEvent = { first: 0, rows: 20, page: 0, pageCount: 0 };
  private elementRef!: ElementRef;

  @ViewChild('paginator', { static: false }) paginator!: Paginator;
  @ViewChild('pageList', { static: false }) targetElem!: ElementRef;
  @Input() page!: ModelSearchResponse | null;
  @Output("changepage") changePage: EventEmitter<number> = new EventEmitter();


  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2, private el: ElementRef) { }


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
    this.scrollTop();
    if (changes['page'] && this.page !== undefined && this.page != null) {
      this.page = changes['page'].currentValue;
      console.log(this.page);
      this.getMovieListFromPage();
    }
  }

  scrollTop() {
    this.targetElem.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


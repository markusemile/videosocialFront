import { Component, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { MovieCardInfo } from 'src/app/page/search/models/MovieCardInfo.model';
import { SearchMovieResponse } from 'src/app/page/search/models/SearchMovieResponse.model';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.scss']
})
export class MovielistComponent {


  private movieList: MovieCardInfo[] | any = [];
  private designType: string = 'card';

  first: number = 0;
  rows: number = 20;
  totalRecords = 120;


  @Input() page: SearchMovieResponse | undefined;
  @Input() design: string | undefined;
  @Input() title: string | undefined;
  @Input() addButton: boolean = false;
  @Input() editButton: boolean = false;
  @Input() removeButton: boolean = false;
  @Input() showDetail:boolean=false;

  @Output() callpage: EventEmitter<number> = new EventEmitter();
  @Output() saveMovie: EventEmitter<number> = new EventEmitter();



  getMovieList() {
    return (this.movieList) ? this.movieList : [];
  }

  getDesignType() {
    return this.designType ? this.designType : 'card';
  }


  onPageChange(e: PaginatorState) {
    this.callpage.emit(e.page);
  }

  addMovie(e: number) {
    this.saveMovie.emit(e);
  }

  ngOnInit() {

    if (this.page) {
      this.movieList = this.page.results;
      this.first = this.page.page;
      this.totalRecords = this.page.total_results;
    }



  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['page']) {
      this.movieList = changes['page'].currentValue.results;
      this.totalRecords = changes['page'].currentValue.total_results;
      this.first = changes['page'].currentValue.page;


    }

  }


}


interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

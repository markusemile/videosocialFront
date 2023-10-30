import { Component, Input, SimpleChanges, EventEmitter, Output, ViewChild, ViewRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Paginator, PaginatorState } from 'primeng/paginator';
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
  totalRecord:number=20;
  userChangePage=false;


  @Input() page: SearchMovieResponse | undefined;
  @Input() design: string | undefined;
  @Input() title: string | undefined;
  @Input() addButton: boolean = false;
  @Input() editButton: boolean = false;
  @Input() removeButton: boolean = false;
  @Input() showDetail:boolean=false;

  @ViewChild('paginator',{static:false}) paginator! :Paginator

  @Output() callpage: EventEmitter<number> = new EventEmitter();
  @Output() saveMovie: EventEmitter<number> = new EventEmitter();
  @Output() removeMovie: EventEmitter<number> = new EventEmitter();

  constructor(private route:ActivatedRoute){


  }


  getMovieList() {
    return (this.movieList) ? this.movieList : [];
  }

  getDesignType() {
    return this.designType ? this.designType : 'card';
  }


  onPageChange(e: PaginatorState) {
    console.log(e);
    const page:number|undefined = e.first;
    if(page) this.paginator.changePage(this.first-1);
    this.callpage.emit(e.page);

  }

  addMovie(e: number) {
    this.saveMovie.emit(e);
  }
  deleteMovie(e: number) {
    this.removeMovie.emit(e);
  }

  onPage(e:Event) {
   console.log(e);


}

  ngOnInit() {
    const f = this.route.snapshot.queryParamMap.get('page');
    if(f) this.first=parseInt(f);
    else this.first=1;
    console.log(this.first);


    this.movieList = (this.page) ? this.page.results : [];
    this.first =(this.page && this.page.page) ? (this.page.page-1)*this.rows : 0 ;
    this.totalRecord = (this.page && this.page.total_results) ? this.page.total_results : 20;

  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['page']) {
      this.movieList = changes['page'].currentValue.results;
      this.totalRecord = changes['page'].currentValue.total_results;
      this.first = (changes['page'].currentValue.page);
      const n = changes['page'].currentValue.page;
    }
    console.log(changes);

  }

  ngAfterViewInit(){

  }

}


interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MovieCardInfo } from 'src/app/page/search/models/MovieCardInfo.model';
import { AppDataService, UserData } from 'src/app/service/appdata/app-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

  blur!: boolean ;


  @Input() info: MovieCardInfo | undefined;
  @Input() addButton: boolean = false;
  @Input() showDetail: boolean = false;

  @Output() saveMovie: EventEmitter<number> = new EventEmitter();


  constructor(
    private appdata: AppDataService,
    private route:Router
    ) {
  }

  ngOnInit() {
    const ud:UserData = this.appdata.getUserDatas();
    this.blur =ud?.blurAdultContent;

  }

  addMovie(id: number) {

    this.saveMovie.emit(id);
  }

  displayDetail(){
    if(this.showDetail){
      this.route.navigate(['/videotek/movie/'+this.info?.id])
    }
  }

}

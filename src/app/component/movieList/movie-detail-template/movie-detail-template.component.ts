import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Belongs_to_collection, Genre, MovieModel } from 'src/app/page/search/models/MovieDetail.model';
import { LocaldbService } from 'src/app/service/localdb/localdb.service';
import { ThemoviedbService } from 'src/app/service/moviedb/themoviedb.service';


@Component({
  selector: 'app-movieDetailTemplate',
  templateUrl: './movie-detail-template.component.html',
  styleUrls: ['./movie-detail-template.component.scss']
})
export class MovieDetailTemplateComponent {

  id : string|undefined;
  details :MovieModel|undefined ;
  genres:string[]=[];
  runtime:string|undefined;


  constructor(
    private route:ActivatedRoute,
    private serviceMdb:ThemoviedbService,
    private serviceDb:LocaldbService
    ){
  }

  ngOnInit(){
    this.route.params.subscribe(res=>{
      if(res && res['id']){
        this.id=res['id']

        this.getDetails();
      }
    })
  }

  getDetails(){
    if(this.id && this.id!=undefined && this.id!==null) this.serviceDb.getMovieDetail(this.id).pipe(
      map(e=>{
      if(e.data){
        const d:MovieModel = e.data;
        if(d.backdrop_path){
          const backDrop = d.backdrop_path.split('/');
          const back_drop_img = backDrop[backDrop.length-1];
          d.backdrop_path="https://image.tmdb.org/t/p/w780/"+back_drop_img;
        }
        if(d.poster_path){
          const poster = d.poster_path.split('/');
          const poster_img = poster[poster.length-1];
          d.poster_path="https://image.tmdb.org/t/p/w300_and_h450_bestv2/"+poster_img;
        }

        if(d.runtime){
          const hours = Math.floor(d.runtime/60);
          const min = d.runtime%60;
          this.runtime=hours+"h "+min+"m";
        }

        for(const [key,value] of Object.entries(d.genres)){
          this.genres.push(value.name);
        }
      }
      return e;

      })
    ).subscribe(res=>{
      console.log(res);

      if(res && res.data){
        this.details=res.data;
        console.log(this.details);
           }
      });
  }

}



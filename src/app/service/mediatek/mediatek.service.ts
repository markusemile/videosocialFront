import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchLocalMovieResponse, SearchMovieResponse } from 'src/app/page/search/models/SearchMovieResponse.model';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MediatekService {

  private currentPager:SearchMovieResponse={page:-1,results:[],total_pages:0,total_results:0};
  private currentList:string[]=[];
  private hasModified:boolean = false;
  private hasModifiedAtPage:number|null=null;
  private prevUrl:string=""

  constructor(
    private http:HttpClient,
    ) {



    }

    getPrevUrl(){
      return this.prevUrl;
    }
    setPrevUrl(url:string){
      this.prevUrl=url;
    }


  isEqual(page:number){
    if(this.currentPager)
      return this.currentPager.page===page ;
    else
      return null;
  }

  hasBeModified(page:number){
    if(this.hasModified && this.hasModifiedAtPage===page){
      return true;
    }else return false;

  }

  setCurrentList(list:string[]){
    this.currentList=list
  }
  getCurrentList(){
    return this.currentList;
  }

  setPage(page:number){
    if(this.currentPager)
      this.currentPager.page=page;
    else this.currentPager= {page:page,results:[],total_pages:0,total_results:0};
  }

  setCurrentPager(page:SearchMovieResponse){
    if(page!==this.currentPager)
      this.currentPager=page;
  }
  getCurrentPager(){
    return this.currentPager;
  }

  updateService(d:SearchLocalMovieResponse){
   this.currentPager=d.pager;
    this.currentList=d.movie_list;
    this.hasModified=false;
    this.hasModifiedAtPage=null;
  }

  setModified(page:number){
    this.hasModified=true;
    this.hasModifiedAtPage=page;
  }


}



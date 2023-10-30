import { Component, Input, ViewChild,OnChanges ,SimpleChanges } from '@angular/core';
import { YearList } from './datas/allYear';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { YearInterface } from 'src/app/page/search/search.component';
import { TreeSelect } from 'primeng/treeselect';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {


  yearList = new YearList();
  yearOptions = this.yearList.getList();
  sourceOptions = [{ label: 'Local', value: 'true' }, { label: 'MovieDB.org', value: 'false' }]
  private toSend: {[key:string]:string} = {};

  form: FormGroup | undefined;


  @Input("query") q!: string;
  @Input("source") s!:string;
  @Input() optionsFilters?: FilterElems = { query: false };
  @ViewChild('tree') tree!:TreeSelect;


  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this._fb.group({
      query: ['', [Validators.required]],
      year: [''],
      src_dta: [this.s]
    })
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['q']){
      const newQuery = changes['q'].currentValue;
      const ff = this.form?.get('query');
      if(ff!==null) ff?.setValue(newQuery);
    }
    if(changes['s']){
      const newS = changes['s'].currentValue;
      const ss = this.form?.get('src_dta');
      if(ss!==null) ss?.setValue(newS)
    }


  }

  /**
   * methode to reset the form
   */
  reset() {
    if (this.form) {
      this.form.reset();
      if (this.form.get('source')) this.form.get('source')?.setValue('false');
    }
  }

  /**
   * methode to initialise the data to create the uri and rerirect to search component
   */
  search() {
    if (this.form) {
      for (let key in this.form.value) {
        if (key == "year") {
          const y = this.form.get(key);
          if (y !== null) {
            const year: YearInterface = y.value;
            if(year){
              const yd=year.data;
              if (yd) {
                let yearData = year.data;
                this.toSend[key] = yearData;
              }
            }else{
              this.toSend[key]="0";
            }
          }else{
            this.toSend[key]="0";
          }
        }else{
            const k = this.form.get(key);
            if(k!==null){
              const v = k.value;
              if(v!==null){
                this.toSend[key]=v;
              }
            }
          }
      }
      this.router.navigate([],{relativeTo:this.route,queryParams:this.toSend})
      this.init();
    }
  }

  ngOnInit() {
    this.init();
  }

  init(){
    this.reset()
    if (this.q && this.form) this.form.get('query')?.setValue(this.q);
    if (this.s && this.form){
      this.form.get('src_dta')?.setValue(this.s);
    }else{
      this.form?.get('src_dta')?.setValue('true');
    }

  }
}


export interface FilterElems {
  query?: boolean,
  year?: boolean,
  source?: boolean,
  multi?: boolean
}

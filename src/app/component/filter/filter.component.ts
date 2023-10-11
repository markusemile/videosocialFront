import { Component, Input, EventEmitter, Output } from '@angular/core';
import { YearList } from './datas/allYear';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {


  yearList = new YearList();
  yearOptions = this.yearList.getList();
  sourceOptions = [{ label: 'Local', value: 'true' }, { label: 'MovieDB.org', value: 'false' }]


  form: FormGroup | undefined;

  @Input() query?: string = '';
  @Input() optionsFilters?: FilterElems = { query: false };


  @Output("params") filterParams: EventEmitter<any> = new EventEmitter();

  constructor(
    private _fb: FormBuilder
  ) {
    this.form = this._fb.group({
      query: [this.query, [Validators.required]],
      year: [''],
      source: ['false']
    })
  }

  reset() {
    if (this.form) {
      this.form.reset();
      if (this.form.get('source')) this.form.get('source')?.setValue('false');
    }
  }

  search() {
    if (this.form) this.filterParams.emit(this.form.value);
  }

  ngOnInit() {
    if (this.query && this.form) this.form.get('query')?.setValue(this.query);
  }

}


export interface FilterElems {
  query?: boolean,
  year?: boolean,
  source?: boolean,
  multi?: boolean
}


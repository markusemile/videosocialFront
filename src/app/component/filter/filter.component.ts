import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Datelist } from '../../shared/tool/dateList';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FilterResponseModel } from './filter-response.models';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  formgroup!: FormGroup;

  nodes!: any[];
  formGroup!: FormGroup;
  sourceMovieDb: any[] = [{ label: 'movieDb', value: 'false' }, { label: 'Local', value: 'true' }]

  @Input() fields: string[] = [];
  @Output("filterDatas") filterDatas = new EventEmitter();

  @ViewChild("myform") formular!: ElementRef;

  constructor(private _fb: FormBuilder) {
    this.formGroup = this._fb.group({
      include_adult: ['false'],
      year: [''],
      query: ['', [Validators.required]],
      sourceLocal: ['false']
    })
  }


  ngOnInit() {
    this.nodes = new Datelist("year").getDateArray();
  }

  search() {
    let datas = JSON.stringify(this.formGroup.value);
    this.filterDatas.emit(JSON.parse(datas));

  }

  resetYear() {
    this.formGroup.get('year')?.reset('');
  }

}

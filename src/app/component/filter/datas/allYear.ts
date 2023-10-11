
export class YearList {

  private list: YearListElem[] = [];
  private presentYear: number = new Date().getFullYear();
  private lastYear: number = 1930;

  constructor() {
    this.fillList()
  }

  fillList() {
    let icr = 1;
    for (let i = this.presentYear; i >= this.lastYear; i--) {
      let yearStr = i.toString();
      let k = icr.toString();
      this.list.push({ key: k, label: yearStr, data: yearStr })
    }
  }

  getList() {
    return this.list;
  }

}

export interface YearListElem {
  key: string,
  label: string,
  data: string
}

import { TreeNode } from 'primeng/api'

export class Datelist {

  currentYear: number = new Date().getFullYear();
  datesArray: TreeNode[] = [];


  constructor(private k: string) {
    this.generateList(k);

  }

  private generateList(k: string) {
    for (let year = this.currentYear; year >= 1970; year--) {
      let t: TreeNode = {
        key: k,
        label: year.toString(),
        data: year.toString()
      }
      this.datesArray.push(t);


    }
  }
  getDateArray() {
    return this.datesArray;
  }


}

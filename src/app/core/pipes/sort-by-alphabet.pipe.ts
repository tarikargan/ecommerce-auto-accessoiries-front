import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByAlphabet'
})
export class SortByAlphabetPipe implements PipeTransform {

  transform(array: any, field: string, sortType:string): any[] {

    if (!Array.isArray(array)) {
      return [];
    }
    if(!sortType){
      return array;
    }
    if(sortType == 'ASC'){
      // ✅ Sort in Ascending order (low to high)
      array.sort((a: any, b: any) => {
        return (a[field] || "").toString().localeCompare((b[field] || "").toString())
      });
    }else{
      // ✅ Sort in Descending order (high to low)
      array.sort((a: any, b: any) => {
        return (a[field] || "").toString().localeCompare((b[field] || "").toString())
      }).reverse();
    }
    return array;
  }

}

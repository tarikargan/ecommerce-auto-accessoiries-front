import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate'
})
export class SortByDatePipe implements PipeTransform {

  transform(array: any, field: string, sortType:string): any[] {
     console.log('sort pipe', array);

    if (!Array.isArray(array)) {
      return [];
    }

    if(sortType == 'ASC'){
      // ✅ Sort in Ascending order (low to high)
      array.sort((a: any, b: any) => {
        return new Date(a[field]).getTime() - new Date(b[field]).getTime();

      });
    }else{
      // ✅ Sort in Descending order (high to low)
      array.sort((a: any, b: any) => {
        return new Date(b[field]).getTime() - new Date(a[field]).getTime();
      });

    }
    return array;
  }
}

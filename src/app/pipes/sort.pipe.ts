import { Pipe, PipeTransform } from '@angular/core';
import { Meetup } from '../components/meetup/meetup.model';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Meetup[] | undefined, sortBy: string) {
    console.log('value', value, 'sortBy', sortBy);
    if (sortBy === 'asc') {
      if (value) {
        const asc = value.sort((objA, objB) => {
          return Number(new Date(objA.time)) - Number(new Date(objB.time))
        })
        return asc;
      } else return;
    } else {
      if (value) {
        return value.sort((objA, objB) => {
          return Number(new Date(objB.time)) - Number(new Date(objA.time))
        })
      } else return;
    }

  }
}

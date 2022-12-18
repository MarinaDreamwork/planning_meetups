import { Pipe, PipeTransform } from '@angular/core';
import { Meetup } from '../components/meetup/meetup.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterValue: string) {
    if (value.length === 0 || filterValue === '') return value;
    let newResult = [];
    for (let item of value) {

      const isNameField = item['name'].toLowerCase().includes(filterValue.toLowerCase());

      const isDescriptionField = item['description'].toLowerCase().includes(filterValue.toLowerCase());

      const isOwnerField = item['owner']['fio'].toLowerCase().includes(filterValue.toLowerCase());

      if (isNameField || isDescriptionField || isOwnerField) {
        newResult.push(item);
      }

    }
    return newResult;
  }

}

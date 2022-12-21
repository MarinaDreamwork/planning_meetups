import { Pipe, PipeTransform } from '@angular/core';
import { Meetup } from '../components/meetup/meetup.model';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  transform(value: Meetup[] | undefined, currentPage: number): Meetup[] | undefined {
    const amountInPage = 4;

    const firstIndex = amountInPage * (currentPage - 1);
    if (value) {
      const crop = value?.slice(firstIndex, firstIndex + amountInPage);
      return crop;
    } else return;
  }
}

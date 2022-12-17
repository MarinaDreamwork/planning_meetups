import { Meetup } from '../components/meetup/meetup.model';
import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../services/user.service';

@Pipe({
  name: 'correctWordEnding'
})
export class CorrectWordEndingPipe implements PipeTransform {
  constructor(private userService: UserService) { }

  transform(value: number, ...args: unknown[]): unknown {
    const subscriber = value + ' подписчик';
    if (value === 0 || value === 5 || value === 6 || value === 7 || value === 8 || value === 9) {
      return subscriber + 'ов';
    } else if (value === 1) {
      return subscriber;
    } else if (value === 2 || value === 3 || value === 4) {
      return subscriber + 'a';
    }
    return;
  }

}

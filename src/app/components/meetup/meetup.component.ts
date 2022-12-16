import { Component, OnInit, Input } from '@angular/core';
import { Meetup } from './meetup.model';

@Component({
  selector: 'app-meetup',
  templateUrl: './meetup.component.html',
  styleUrls: ['./meetup.component.scss']
})
export class MeetupComponent implements OnInit {
  @Input() meetup!: Meetup;
  isCompleted!: boolean;

  ngOnInit(): void {
    this.isCompleted = this.isMeetupCompleted();
  }

  isMeetupCompleted() {
    const time = new Date().getTime();
    const meetupTime = new Date(this.meetup.time).getTime();
    if (time - meetupTime) {
      return true;
    }
    return false;
  }

}

import { Component, OnInit } from '@angular/core';
import { MeetupService } from 'src/app/services/meetup.service';
import { Meetup } from '../meetup/meetup.model';

@Component({
  selector: 'app-meetup-list',
  templateUrl: './meetup-list.component.html',
  styleUrls: ['./meetup-list.component.scss']
})
export class MeetupListComponent implements OnInit {
  meetups: Meetup[] | undefined = [];
  constructor(private meetupService: MeetupService) { }

  ngOnInit() {
    this.meetups = this.meetupService.meetups;
  }
}

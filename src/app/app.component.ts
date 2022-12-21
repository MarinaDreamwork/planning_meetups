import { Component, OnInit } from '@angular/core';
import { MeetupService } from './services/meetup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'planning_meetups';
  isLoadingMeetups!: boolean;

  constructor() { }

  ngOnInit() {

  }

}

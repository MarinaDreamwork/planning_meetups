import { Component, OnInit } from '@angular/core';
import { MeetupService } from 'src/app/services/meetup.service';
import { UserService } from 'src/app/services/user.service';
import { Meetup } from '../meetup/meetup.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meetup-list',
  templateUrl: './meetup-list.component.html',
  styleUrls: ['./meetup-list.component.scss']
})
export class MeetupListComponent implements OnInit {
  meetups: Meetup[] | undefined;
  myMeetups: Meetup[] | undefined;
  isLoadingMeetups = false;

  constructor(private meetupService: MeetupService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.isLoadingMeetups = this.meetupService.isLoading;
    this.meetupService.fetchAllMeetups().subscribe(
      (data) => {
        this.isLoadingMeetups = false;
        console.log('data', data);
        this.meetups = data;
        if (this.router.url.includes('my_meetups')) {
          return this.filterMyMeetups();
        }
      }
    );

    // if (this.meetups && this.router.url.includes('my_meetups')) {
    //   const filt = this.filterMyMeetups();
    //   return filt;
    // }
  }

  filterMyMeetups() {
    this.myMeetups = this.meetups?.filter(meetup => {
      return meetup.owner.id === this.userService.user?.id
    })
  }



}

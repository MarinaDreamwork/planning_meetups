import { Component, OnDestroy, OnInit } from '@angular/core';
import { MeetupService } from 'src/app/services/meetup.service';
import { Meetup, MeetupForm } from '../meetup/meetup.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-meetup-list',
  templateUrl: './meetup-list.component.html',
  styleUrls: ['./meetup-list.component.scss']
})
export class MeetupListComponent implements OnInit, OnDestroy {
  meetups: Meetup[] | undefined;
  myMeetups: Meetup[] | undefined;
  isLoadingMeetups = false;
  filteredValue = ''
  sortedBy = 'asc';
  subscription!: Subscription;

  constructor(
    private meetupService: MeetupService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.isLoadingMeetups = this.meetupService.isLoading;
    this.subscription = this.meetupService.fetchAllMeetups().subscribe(
      (meetups) => {
        this.isLoadingMeetups = false;
        console.log('data', meetups);
        this.meetups = meetups;
        if (this.router.url.includes('my_meetups')) {
          return this.filterMyMeetups();
        }
      }

    );

    this.meetupService.createSubject.subscribe((newMeetup: any) => {
      console.log('FROM CREATION SUBSCRIPTION', newMeetup);
      return this.meetups?.push({ ...newMeetup, users: [] });
    });

    this.meetupService.updateSubject.subscribe((data: any) => {
      console.log('UPDATE', data);
      let index = this.meetups?.findIndex((meetup) => {
        return meetup.id === data.id
      });
      console.log('index', index);
      if (index) {
        return this.meetups![index] = data;
      }
    });

    this.meetupService.deleteSubject.subscribe((id: any) => {
      console.log('FROM DELETE id', id);
      const remains = this.meetups?.filter(meetup => meetup.id !== id)
      console.log('remains:::', remains);
      return remains;
    })

  }

  filterMyMeetups() {
    this.myMeetups = this.meetups?.filter(meetup => {
      return meetup.owner.id === this.authService.user?.id
    })
  }

  toggleSort() {
    if (this.sortedBy === 'asc') {
      return this.sortedBy = 'desc';
    } else {
      return this.sortedBy = 'asc';
    }
  }

  updateMeetup() {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    //this.meetupService.addSubject.unsubscribe();
    //this.meetupService.subject.unsubscribe();
  }


}

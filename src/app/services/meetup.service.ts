import { Injectable } from '@angular/core';
import { Meetup } from '../components/meetup/meetup.model';

@Injectable({
  providedIn: 'root'
})
export class MeetupService {
  meetups: Meetup[] | undefined = [];

  constructor() { }

  addMeetup() {

  }

  updateMeetup() {

  }

  deleteMeetup() {

  }
}

import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEnvironment } from 'src/environments/environment';
import { Meetup } from '../components/meetup/meetup.model';

@Injectable({
  providedIn: 'root'
})
export class MeetupService {
  meetups: Meetup[] | undefined = [];
  meetUpUrl: IEnvironment['apiUrl'] = `${environment.apiUrl}/meetup`;

  constructor(private http: HttpClient) { }

  fetchAllMeetups() {
    return this.http.get<Meetup[]>(this.meetUpUrl);
  }

  addMeetup() {

  }

  updateMeetup() {

  }

  deleteMeetup() {

  }
}

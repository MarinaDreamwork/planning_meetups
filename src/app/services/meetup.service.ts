import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEnvironment } from 'src/environments/environment';
import { Meetup, MeetupForm } from '../components/meetup/meetup.model';
import { Observable, Subscription, filter, tap, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetupService {
  meetups: Meetup[] | undefined;
  meetUpUrl: IEnvironment['apiUrl'] = `${environment.apiUrl}/meetup`;
  isLoading = false;
  updateSubject = new Subject();
  createSubject = new Subject();
  deleteSubject = new Subject();
  //meetupDeleteSbject = new Subject();

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  fetchAllMeetups() {
    this.isLoading = true;
    return this.http.get<Meetup[]>(this.meetUpUrl);
  }

  addMeetup(formData: MeetupForm) {
    return this.http.post<Meetup>(this.meetUpUrl, formData);
  }

  joinMeetup(data: { idMeetup: number, idUser: number }) {
    return this.http.put<Meetup>(this.meetUpUrl, data)
  }

  updateMeetup(id: number, updatedMeetup: MeetupForm) {
    return this.http.put(`${this.meetUpUrl}/${id}`, updatedMeetup);
  }

  deleteJoiningMeetup(data: { idMeetup: number, idUser: number }) {
    return this.http.delete<Meetup>(this.meetUpUrl, { body: data });
  }

  deleteMeetup(meetupId: number) {
    return this.http.delete<Meetup>(`${this.meetUpUrl}/${meetupId}`);
  }

  getMeetupById(id: number) {
    return this.fetchAllMeetups().pipe(
      map(el => el.filter(el => el.id === id))
    )
  }
}

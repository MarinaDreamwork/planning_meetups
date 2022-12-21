import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, DoCheck } from '@angular/core';
import { IEnvironment } from 'src/environments/environment';
import { Meetup, MeetupForm } from '../components/meetup/meetup.model';
import { map, Subject, BehaviorSubject, interval } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { TimerHandle } from 'rxjs/internal/scheduler/timerHandle';

@Injectable({
  providedIn: 'root'
})
export class MeetupService implements OnInit {
  meetups: Meetup[] | undefined;
  meetUpUrl: IEnvironment['apiUrl'] = `${environment.apiUrl}/meetup`;
  isLoading = new BehaviorSubject<boolean>(false);
  updateSubject = new Subject();
  createSubject = new Subject();
  deleteSubject = new Subject();
  reloadData = new Subject<Meetup[]>();
  timerId!: any;

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  loadMeetupData() {
    this.timerId = setInterval(() => {
      console.log('check');
      return this.fetchAllMeetups().subscribe(val => console.log(val));
    }, 15000);
  }

  fetchAllMeetups() {
    return this.http.get<Meetup[]>(this.meetUpUrl);
  }

  addMeetup(formData: MeetupForm) {
    return this.http.post<Meetup>(this.meetUpUrl, formData);
  }

  joinMeetup(data: { idMeetup: number, idUser: number }) {
    return this.http.put<Meetup>(this.meetUpUrl, data);
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

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId)
    }
  }
}

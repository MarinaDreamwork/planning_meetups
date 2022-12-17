import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEnvironment } from 'src/environments/environment';
import { Meetup, MeetupForm } from '../components/meetup/meetup.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetupService {
  meetups: Meetup[] | undefined;
  meetUpUrl: IEnvironment['apiUrl'] = `${environment.apiUrl}/meetup`;
  isLoading = false;

  constructor(private http: HttpClient) { }

  fetchAllMeetups() {
    this.isLoading = true;
    return this.http.get<Meetup[]>(this.meetUpUrl);
  }

  addMeetup(formData: MeetupForm) {
    return this.http.post<Meetup>(this.meetUpUrl, formData).subscribe(data => {
      this.meetups?.push(data);
    });
  }


  joinMeetup(data: { idMeetup: number, idUser: number }) {
    return this.http.put<Meetup>(this.meetUpUrl, data)
  }

  // updateMeetup(id, updatedMeetup) {
  //   return this.http.put(this.meetUpUrl)
  // }

  deleteJoiningMeetup(data: { idMeetup: number, idUser: number }) {
    return this.http.delete<Meetup>(this.meetUpUrl, { body: data });
  }

  deleteMeetup(meetupId: number) {
    return this.http.delete<Meetup>(`${this.meetUpUrl}/${meetupId}`);
  }

  onClearMeetup(id: number) {
    this.deleteMeetup(id).subscribe(data => {
      return this.meetups?.filter(meetup => meetup.id === data.id);
    })
  }
  getMeetupById(id: number) {
    return this.fetchAllMeetups().subscribe(data => {
      return data.filter(elem => elem.id === id);
    });

  }
}

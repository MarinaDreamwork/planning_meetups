import { Component, OnInit, Input } from '@angular/core';
import { Meetup } from './meetup.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MeetupService } from 'src/app/services/meetup.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-meetup',
  templateUrl: './meetup.component.html',
  styleUrls: ['./meetup.component.scss']
})
export class MeetupComponent implements OnInit {
  @Input() meetup!: Meetup;
  isCompleted!: boolean;
  isOpenMenu = false;
  fullDetailed = false;
  isJoined!: boolean; //false
  meetupParams!: { id: number | string }

  constructor(
    private route: ActivatedRoute,
    private meetupService: MeetupService,
    private userService: UserService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isCompleted = this.isMeetupCompleted();
    this.meetupParams = {
      id: this.route.snapshot.params['id']
    }

    this.route.params.subscribe((params: Params) => {
      this.meetupParams.id = params['id'];
      console.log(params['id']);
    })
    if (this.meetup?.users?.length) {
      this.isJoined = this.meetup?.users?.length > 0;
    }

  }

  isMeetupCompleted() {
    const time = new Date().getTime();
    const meetupTime = (new Date(`${this.meetup.time}`)).getTime();
    if (time > meetupTime) {
      return true;
    }
    return false;
  }

  onToggleOptions() {
    this.isOpenMenu = !this.isOpenMenu;
  }

  onOpenDetails() {
    console.log('isOpenMenu', this.isOpenMenu);
    this.fullDetailed = !this.fullDetailed;
    this.isOpenMenu = !this.isOpenMenu;
  }

  onDeleteJoiningMeetup() {
    const isConfirmed = confirm('Вы уверены, что хотите отписаться от митапа?');
    if (isConfirmed) {
      if (this.authService.user?.id) {
        this.meetupService.deleteJoiningMeetup({ idMeetup: this.meetup.id, idUser: this.authService.user.id }).subscribe(data => {
          this.meetup = data;
          if (data?.users?.length) {
            this.isJoined = data?.users?.length > 0;
          }

        });

      } else return;

    } else return;
  }

  onJoinMeetup() {
    if (this.authService.user?.id) {
      this.meetupService.joinMeetup({ idMeetup: this.meetup.id, idUser: this.authService.user?.id }).subscribe(data => {
        this.meetup = data;
        if (data?.users?.length) {
          this.isJoined = data.users?.length > 0;
        }

      })
    } else return;
  }

  onDeleteMeetup() {
    //this.meetupService.updateSubject.next(this.meetup.id);
    return this.meetupService.deleteMeetup(this.meetup.id)
      .subscribe(data => {
        console.log('id', data);
        return this.meetupService.deleteSubject.next(data);
      });
  }

  // onUpdateMeetup() {
  //   const navParams = {
  //     queryParams: { 'id': this.meetup.id }
  //   }
  //   this.router.navigate(['update'], navParams);
  // }
}

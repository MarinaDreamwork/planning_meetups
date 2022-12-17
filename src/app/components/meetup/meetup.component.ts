import { Component, OnInit, Input } from '@angular/core';
import { Meetup } from './meetup.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MeetupService } from 'src/app/services/meetup.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

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
  isJoined = false;
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
    const isConfirmed = confirm('Вы уверены, что хотите удалить данный митап?');
    if (isConfirmed) {
      if (this.authService.user?.id) {
        this.meetupService.deleteJoiningMeetup({ idMeetup: this.meetup.id, idUser: this.authService.user.id }).subscribe(data => {
          this.meetup = data;
        })
      } else return;
    } else return;
  }

  onJoinMeetup() {
    if (this.authService.user?.id) {
      this.meetupService.joinMeetup({ idMeetup: this.meetup.id, idUser: this.authService.user?.id }).subscribe(data => {
        this.meetup = data;
        console.log('data:', data);
      })
    } else return;
  }

  onDeleteMeetup() {
    this.meetupService.onClearMeetup(this.meetup.id);
  }

  // onUpdateMeetup() {
  //   const navParams = {
  //     queryParams: { 'id': this.meetup.id }
  //   }
  //   this.router.navigate(['update'], navParams);
  // }
}

import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MeetupService } from 'src/app/services/meetup.service';
import { Meetup, MeetupForm } from '../meetup/meetup.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../meetup/user.model';

@Component({
  selector: 'app-meetup-creation',
  templateUrl: './meetup-creation.component.html',
  styleUrls: ['./meetup-creation.component.scss']
})
export class MeetupCreationComponent implements OnInit {
  creationMeetupForm!: FormGroup<{
    name: FormControl<MeetupForm['name']>,
    description: FormControl<MeetupForm['description']>,
    time: FormControl<MeetupForm['time']>,
    duration: FormControl<MeetupForm['duration']>,
    location: FormControl<MeetupForm['location']>,
    target_audience: FormControl<MeetupForm['target_audience']>,
    need_to_know: FormControl<MeetupForm['need_to_know']>,
    will_happen: FormControl<MeetupForm['will_happen']>,
    reason_to_come: FormControl<MeetupForm['reason_to_come']>,
    timeHours: FormControl<string | null>
  }>
  meetup!: any;
  constructor(private fBuilder: FormBuilder, private meetupService: MeetupService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {
    if (this.router.url.includes('update')) {
      const idParam = Number(this.route.snapshot.params['id']);
      this.meetup = this.meetupService.getMeetupById(idParam);
      console.log('idParam', idParam);
      console.log('this.meetup', this.meetup);
      if (this.meetup) {
        this.creationMeetupForm = this.fBuilder.group({
          name: [`${this.meetup[0].name}`],
          description: [this.meetup[0].description],
          time: [this.meetup[0].time],
          duration: [this.meetup[0].duration],
          location: [this.meetup[0].location],
          target_audience: [this.meetup[0].target_audience],
          need_to_know: [this.meetup[0].need_to_know],
          will_happen: [this.meetup[0].will_happen],
          reason_to_come: [this.meetup[0].reason_to_come],
          timeHours: ['']
        })
      }
      console.log('creationMeetupForm', this.creationMeetupForm);

    }
    this.creationMeetupForm = this.fBuilder.group({
      name: [''],
      description: [''],
      time: [''],
      duration: [15],
      location: [''],
      target_audience: [''],
      need_to_know: [''],
      will_happen: [''],
      reason_to_come: [''],
      timeHours: ['']
    })
  }

  onSubmit() {
    const formData: any = this.creationMeetupForm.value;
    const updatedFormData = {
      name: formData.name,
      description: formData.description,
      time: formData.time + ' ' + formData.timeHours,
      duration: Number(formData.duration),
      location: formData.location,
      target_audience: formData.target_audience,
      need_to_know: formData.need_to_know,
      will_happen: formData.will_happen,
      reason_to_come: formData.reason_to_come,
    }
    console.log(updatedFormData);
    this.meetupService.addMeetup(updatedFormData);
    this.router.navigate(['/meetups/my_meetups']);
  }

}

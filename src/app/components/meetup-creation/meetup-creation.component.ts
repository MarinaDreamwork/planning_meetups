import { Subscription } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
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
  error = null;
  professions = ['аналитики', 'тестировщики', 'зумеры', 'программисты']

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
      name: ['', Validators.required],
      description: ['', Validators.required],
      time: ['', Validators.required],
      duration: [15, Validators.required],
      location: ['', Validators.required],
      target_audience: ['', Validators.required],
      need_to_know: ['', Validators.required],
      will_happen: ['', Validators.required],
      reason_to_come: ['', Validators.required],
      timeHours: ['', Validators.required]
    })
  }

  isErrorNameEmpty() {
    if (this.creationMeetupForm.get('name')?.hasError('required') && this.creationMeetupForm.get('name')?.touched) {
      return 'Поле Название обязательно для заполнения';
    }
    return;
  }

  isErrorDateEmpty() {
    if (this.creationMeetupForm.get('time')?.hasError('required') && this.creationMeetupForm.get('time')?.touched) {
      return 'Поле Дата встречи обязательно для заполнения';
    }
    return;
  }

  isErrorTimeEmpty() {
    if (this.creationMeetupForm.get('timeHours')?.hasError('required') && this.creationMeetupForm.get('timeHours')?.touched) {
      return 'Поле Время встречи обязательно для заполнения';
    }
    return;
  }

  isErrorLocationEmpty() {
    if (this.creationMeetupForm.get('location')?.hasError('required') && this.creationMeetupForm.get('location')?.touched) {
      return 'Поле Место проведения обязательно для заполнения';
    }
    return;
  }

  isErrorDescriptionEmpty() {
    if (this.creationMeetupForm.get('description')?.hasError('required') && this.creationMeetupForm.get('description')?.touched) {
      return 'Поле Описание обязательно для заполнения';
    }
    return;
  }
  isErrorNeedEmpty() {
    if (this.creationMeetupForm.get('need_to_know')?.hasError('required') && this.creationMeetupForm.get('need_to_know')?.touched) {
      return 'Поле Что необходимо знать обязательно для заполнения';
    }
    return;
  }

  isErrorHappendEmpty() {
    if (this.creationMeetupForm.get('will_happen')?.hasError('required') && this.creationMeetupForm.get('will_happen')?.touched) {
      return 'Поле Что будет обязательно для заполнения';
    }
    return;
  }

  isErrorAudienceEmpty() {
    if (this.creationMeetupForm.get('target_audience')?.hasError('required') && this.creationMeetupForm.get('target_audience')?.touched) {
      return 'Поле Целевая аудитория обязательно для заполнения';
    }
    return;
  }

  isErrorReasonEmpty() {
    if (this.creationMeetupForm.get('reason_to_come')?.hasError('required') && this.creationMeetupForm.get('reason_to_come')?.touched) {
      return 'Поле Причина прихода обязательно для заполнения';
    }
    return;
  }

  onFieldErrors() {
    const touched = this.creationMeetupForm.get('duration')?.touched;
    const isNameEmpty = this.creationMeetupForm.get('duration')?.hasError('required') && touched;
    const isDurationEmptyField = this.creationMeetupForm.get('duration')?.hasError('required') && touched;
    if (isDurationEmptyField) {
      return 'Поле Продолжительность обязательно для заполнения'
    } else return;

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

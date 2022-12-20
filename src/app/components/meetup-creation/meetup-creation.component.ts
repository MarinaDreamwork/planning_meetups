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
  title = 'Создание митапа:';
  buttonDescription = 'Создать митап';
  idParam = Number(this.route.snapshot.params['id'])

  constructor(private fBuilder: FormBuilder, private meetupService: MeetupService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {
    if (this.router.url.includes('update')) {
      this.title = 'Изменение митапа:';
      this.buttonDescription = 'Изменить митап';
      //const idParam = Number(this.route.snapshot.params['id']);

      this.meetup = this.meetupService.getMeetupById(this.idParam).subscribe(meetup => {
        const commonDateInfo = meetup[0].time;

        const day = this.getDayFormat(commonDateInfo);
        const time = this.getTimeFormat(commonDateInfo)

        this.creationMeetupForm = this.fBuilder.group({
          name: [`${meetup[0].name}`],
          description: [meetup[0].description],
          time: [day],
          duration: [meetup[0].duration],
          location: [meetup[0].location],
          target_audience: [meetup[0].target_audience],
          need_to_know: [meetup[0].need_to_know],
          will_happen: [meetup[0].will_happen],
          reason_to_come: [meetup[0].reason_to_come],
          timeHours: [time]
        })
      });


    } else {

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
    const isDurationEmptyField = this.creationMeetupForm.get('duration')?.hasError('required') && touched;
    if (isDurationEmptyField) {
      return 'Поле Продолжительность обязательно для заполнения'
    } else return;

  }

  getDayFormat(dateString: string) {
    const year = new Date(dateString).getFullYear();
    const month = new Date(dateString).getMonth() + 1;
    const day = new Date(dateString).getDate();
    return `${year}-${month}-${day}`;
  }

  getTimeFormat(dateString: string) {
    const hours = new Date(dateString).getHours();
    const min = new Date(dateString).getMinutes();
    return `${hours}:${min}`;
  }

  onSubmit() {
    const formData: any = this.creationMeetupForm.value;
    const updatedFormData = {
      name: formData.name,
      description: formData.description,
      time: formData.time + 'T' + formData.timeHours + ':00.000Z',
      duration: Number(formData.duration),
      location: formData.location,
      target_audience: formData.target_audience,
      need_to_know: formData.need_to_know,
      will_happen: formData.will_happen,
      reason_to_come: formData.reason_to_come
    }
    console.log(updatedFormData);

    if (this.idParam) {
      const updatedData = this.meetupService.updateMeetup(this.idParam, updatedFormData).subscribe(elem => {
        return this.meetupService.updateSubject.next(elem);
      });
      this.router.navigate(['/meetups/my_meetups']);
      return updatedData;

    } else {
      const addedData = this.meetupService.addMeetup(updatedFormData).subscribe((data: Meetup) => {
        console.log('data from server', data);
        return this.meetupService.createSubject.next(data)
      });
      //
      this.router.navigate(['/meetups/all_meetups']);
      console.log('added', addedData);
      return addedData;
    }



  }

}

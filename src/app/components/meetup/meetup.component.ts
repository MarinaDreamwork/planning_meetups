import { Component, OnInit, Input } from '@angular/core';
import { Meetup } from './meetup.model';

@Component({
  selector: 'app-meetup',
  templateUrl: './meetup.component.html',
  styleUrls: ['./meetup.component.scss']
})
export class MeetupComponent implements OnInit {
  @Input() meetup!: Meetup;

  ngOnInit(): void {

  }

}

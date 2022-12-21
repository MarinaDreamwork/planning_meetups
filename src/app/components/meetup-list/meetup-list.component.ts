import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MeetupService } from 'src/app/services/meetup.service';
import { Meetup, MeetupForm } from '../meetup/meetup.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription, Subject, of } from 'rxjs';

@Component({
  selector: 'app-meetup-list',
  templateUrl: './meetup-list.component.html',
  styleUrls: ['./meetup-list.component.scss']
})
export class MeetupListComponent implements OnInit, OnDestroy {
  meetups: Meetup[] | undefined;
  myMeetups: Meetup[] | undefined;
  filteredValue = '';
  filteredMeetups!: Meetup[] | undefined;
  sortedBy = 'asc';
  subscription!: Subscription;
  isLoadingMeetups!: boolean;
  currentPage = 1;
  pages: number[] | undefined = [];
  meetupsForUI: Meetup[] | undefined;
  searchForm!: FormGroup<{
    filteredValue: FormControl<string | null>
  }>


  constructor(
    private meetupService: MeetupService,
    private authService: AuthService,
    private router: Router,
    private fBuilder: FormBuilder) { }

  ngOnInit() {

    this.searchForm = this.fBuilder.group({
      filteredValue: ['']
    });
    this.searchForm.valueChanges.subscribe((value) => {
      const filteredString = value.filteredValue;
      if (filteredString !== '') {
        this.currentPage = 1;
        this.filteredMeetups = this.filterByCustomData(this.meetups, filteredString);
        if (this.filteredMeetups!.length > 0) {
          this.pages = this.makePagesCount(this.filteredMeetups?.length);
        }
      } else {
        this.filteredMeetups = undefined;
        this.pages = this.makePagesCount(this.meetups?.length);
      }
    })

    this.subscription = this.meetupService.fetchAllMeetups().subscribe(
      (meetups) => {
        this.meetupService.isLoading.next(false);
        this.meetups = this.sort(meetups, this.sortedBy);

        if (!this.router.url.includes('my_meetups')) {
          //this.pages = this.makePagesCount(meetups.length);
        } else {
          this.myMeetups = this.filterMyMeetups();
          // console.log('this.myMeetups', this.myMeetups?.length === 0);
          // if (this.myMeetups?.length === 0) {
          //   return this.pages = [];
          // } else return this.pages = this.makePagesCount(this.myMeetups?.length);
        }
        return;
        //if (this.router.url.includes('my_meetups')) {
        //  this.myMeetups = this.filterMyMeetups();
        //}
        // this.meetupService.isLoading.next(false);
        // this.myMeetups = this.filterMyMeetups();
        // this.pages = this.makePagesCount(this.myMeetups?.length)
        // return this.filteredMeetups;
      }
    );

    this.meetupService.isLoading.subscribe(loader => {
      return this.isLoadingMeetups = loader;
    })

    this.meetupService.createSubject.subscribe((newMeetup: any) => {
      this.myMeetups = this.filterMyMeetups();
      console.log('FROM CREATION SUBSCRIPTION', newMeetup);
      return newMeetup
    });

    this.meetupService.updateSubject.subscribe((data: any) => {
      this.myMeetups = this.filterMyMeetups();
      console.log('UPDATE', data);
      let index = this.meetups?.findIndex((meetup) => {
        return meetup.id === data.id
      });
      console.log('index', index);
      if (index) {
        return this.meetups![index] = data;
      }
    });

    this.meetupService.deleteSubject.subscribe((deletedMeetup: any) => {
      return this.meetups = this.meetups?.filter(meetup => meetup.id !== deletedMeetup.id);
    });


    this.meetupService.reloadData.subscribe(value => {
      this.meetupService.isLoading.next(false);
      this.meetups = value;
      console.log('value from subscr', value);
    })
    this.meetupService.loadMeetupData();

  }

  filterMyMeetups() {
    return this.myMeetups = this.meetups?.filter(meetup => {
      console.log('meetupCreatedBy', meetup.createdBy);
      console.log('this.authService.user?.id', this.authService.user?.id);
      if (typeof meetup.createdBy === 'object') {
        return meetup.createdBy[0] === this.authService.user?.id;
      }
      return meetup.createdBy === this.authService.user?.id
    })
  }

  toggleSort() {

    if (this.sortedBy === 'asc') {
      return this.sortedBy = 'desc';
    } else {
      return this.sortedBy = 'asc';
    }
  }

  ngDoCheck() {
    this.meetupsForUI = this.filteredMeetups || this.myMeetups || this.meetups;
    this.pages = this.pages = this.makePagesCount(this.meetupsForUI?.length);
  }

  sort(value: Meetup[] | undefined, sortBy: string) {
    if (sortBy === 'asc') {
      if (value) {
        return value.sort((objA, objB) => {
          return Number(new Date(objA.time)) - Number(new Date(objB.time))
        });
      } else return;
    } else {
      if (value) {
        return value.sort((objA, objB) => {
          return Number(new Date(objB.time)) - Number(new Date(objA.time))
        });
      } else return;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    //this.meetupService.addSubject.unsubscribe();
    //this.meetupService.subject.unsubscribe();
  }

  onChoosePage(page: number) {
    this.currentPage = page;
  }

  makePagesCount(totalAmount: number | undefined) {
    if (totalAmount) {
      const itemsPerPage = 4;
      const pages = Math.ceil(totalAmount / itemsPerPage);
      const arr = [];
      for (let i = 1; i <= pages; i++) {
        arr.push(i);
      }
      return arr;
    } else return;

  }

  filterByCustomData(value: Meetup[] | undefined, filterValue: string | null | undefined) {
    if (value?.length === 0 || filterValue === '') return value;
    else {
      let newResult = [];
      for (let item of value!) {
        if (filterValue) {
          const isNameField = item?.name.toLowerCase().includes(filterValue.toLowerCase());
          const isDescriptionField = item.description?.toLowerCase().includes(filterValue.toLowerCase());
          let isOwnerField;
          if (item?.owner?.fio) {
            isOwnerField = item?.owner?.fio.toLowerCase().includes(filterValue.toLowerCase());
          }
          if (isNameField || isDescriptionField || isOwnerField) {
            newResult.push(item);
          }
        }

      }
      return newResult;
    }
  }


}

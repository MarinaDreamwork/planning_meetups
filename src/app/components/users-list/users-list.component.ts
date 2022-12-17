import { Component, OnInit } from '@angular/core';
import { User } from '../meetup/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User[] | undefined;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.fetchAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  onUpdateUser() {

  }

  onDeleteUser(id: User['id']) {
    if (id) {
      return this.userService.deleteUser(id).subscribe(data => {
        return this.users?.filter(user => user.id !== data.id)
      });
    } else return;
  }

}

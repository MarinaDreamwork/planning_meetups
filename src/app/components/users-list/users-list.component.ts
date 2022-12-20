import { Component, OnInit } from '@angular/core';
import { User } from '../meetup/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User[] | undefined;
  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userService.fetchAllUsers().subscribe(data => {
      this.users = data;
    });
    this.authService.createUserSubject.subscribe((data: any) => {
      return this.userService.fetchAllUsers().subscribe(users => {
        console.log('users', users);
        this.users = users;
      })

    })
  }

  onUpdateUser(updatedUser: User) {
    return this.userService.updateUser(updatedUser).subscribe(updUser => {
      console.log('updUser');
      const index = this.users?.findIndex(user => user.id === updUser.id);
      console.log('index', index);
      if (index) {
        return this.users![index] = updUser;
      } else return

    })
  }

  onDeleteUser(id: User['id']) {
    if (id) {
      return this.userService.deleteUser(id).subscribe(data => {
        this.users = this.users?.filter(user => user.id !== data.id)
      });
    } else return;
  }

}

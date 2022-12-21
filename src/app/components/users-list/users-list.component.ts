import { Subject } from 'rxjs';
import { Component, OnInit, Injectable } from '@angular/core';
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
  isLoadingUsers!: boolean;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userService.isLoadingUsers.subscribe(loader => {
      return this.isLoadingUsers = loader;
    });
    this.userService.fetchAllUsers().subscribe(data => {
      this.userService.isLoadingUsers.next(false);
      this.users = data;
    });
    this.userService.updatedUserSubject.subscribe(updatedUser => {
      console.log('data from usersListComponent during update', updatedUser);
      this.userService.fetchAllUsers();
      // const index = this.users?.findIndex(user => {
      //   console.log('user.id === updatedUser.id', user.id === updatedUser.id);
      //   user.id === updatedUser.id
      // })
      //   ;
      // console.log('index', index);
      // if (index) {
      //   return this.users![index] = updatedUser;
      // } else return
    })

    this.userService.reloadUsersData.subscribe(value => {
      this.userService.isLoadingUsers.next(false);
      this.users = value;
      console.log('users from reloading', value);
    })
    this.userService.loadUsersData();

    // this.authService.createUserSubject.subscribe((data: any) => {
    //   console.log('data from creation', data);
    //   if (this.users!.length > 0) {
    //     return this.users = this.users?.push(data);
    //   }
    // })
  }

  // onUpdateUser(updatedUser: User) {
  //   return this.userService.updateUser(updatedUser).subscribe(updUser => {
  //     console.log('updUser');
  //     const index = this.users?.findIndex(user => user.id === updUser.id);
  //     console.log('index', index);
  //     if (index) {
  //       return this.users![index] = updUser;
  //     } else return

  //   })
  // }

  onDeleteUser(id: User['id']) {
    if (id) {
      return this.userService.deleteUser(id).subscribe(data => {
        this.users = this.users?.filter(user => user.id !== data.id)
      });
    } else return;
  }

  // getUserById(id: number) {
  //   return this.users?.filter(user => user.id === id);
  // }

}

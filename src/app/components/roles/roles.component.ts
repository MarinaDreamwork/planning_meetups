import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  roles!: { id: number, name: string }[] | null;
  @ViewChild('roleName') addRoleField!: ElementRef;
  @ViewChild('newName') updateNameField!: ElementRef;
  openForm = false;
  updateForm = false;
  updatedId: number | null = null;
  constructor(private rolesService: RolesService) { }

  ngOnInit() {
    this.rolesService.fetchAllRoles().subscribe(roles => {
      console.log('rol', roles);
      this.roles = roles;
    });

    this.rolesService.rolesSubject.subscribe((addition: { name: string }) => {
      return this.rolesService.addRole(addition).subscribe(newRole => {
        this.roles?.push(newRole);
      })
    });

    this.rolesService.updateRoleSubject.subscribe(changes => {
      console.log('CHANGES', changes);
      return this.rolesService.updateRoleByName(changes).subscribe((updatedData: any) => {
        console.log('updatedData', updatedData);
        const index = this.roles?.findIndex(upd => upd.id === updatedData.id);
        if (index) {
          this.roles![index] = updatedData;
        }
      })
    })

    this.rolesService.deleteRoleSubject.subscribe(deletedName => {
      return this.rolesService.deleteRole(deletedName).subscribe(deletedItem => {
        console.log('deleted Item', deletedItem);
        if (this.roles) {
          this.roles = this.roles?.filter(elem => elem.id !== deletedItem.id);
        } else return;
      })
    })
  }

  toggleOpenForm() {
    return this.openForm = !this.openForm;
  }

  isErrorNameEmpty() {

  }

  onAddRole() {
    const newRole = this.addRoleField.nativeElement.value;
    this.openForm = false;
    return this.rolesService.rolesSubject.next({ name: newRole });
  }

  onUpdateRole(id: number) {
    this.updateForm = !this.updateForm;
    this.updatedId = id;
  }

  onUpdateSubmit() {
    const newName = this.updateNameField.nativeElement.value;
    let oldName;
    if (this.roles) {
      oldName = this.roles[this.roles?.findIndex(role => role.id === this.updatedId)].name;
    } else return;
    this.updateForm = false;
    return this.rolesService.updateRoleSubject.next({ oldName, newName })
  }

  onDeleteRole(name: string) {
    return this.rolesService.deleteRoleSubject.next({ name });
  }

}

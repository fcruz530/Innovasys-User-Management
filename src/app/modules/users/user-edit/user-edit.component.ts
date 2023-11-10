import { Component, Input, OnInit } from '@angular/core';
import { finalize, switchMap } from 'rxjs';
import { USER_GENDER_TYPES, USER_STATUSES } from 'src/app/core/const/users';
import { usersFormGroup } from 'src/app/core/forms/user.form';
import { UsersService } from 'src/app/core/http/services/users/users.service';
import { IUser } from 'src/app/core/models/users/user.model';
import { AlertService } from 'src/app/core/services/alerts/alert.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  @Input()
  id: number;

  usersFormGroup = usersFormGroup();
  genders = USER_GENDER_TYPES;
  statuses = USER_STATUSES;

  loading: boolean = false;

  constructor(private usersService: UsersService,
    private location: Location,
    private alertsService: AlertService) { }

  ngOnInit(): void {
    if (this.id) {
      this.getUser();
    }
  }

  private getUser(): void {
    this.loading = true;
    this.usersService.getUser(this.id).pipe(
      finalize(() => this.loading = false)
    ).subscribe((user) => {
      this.usersFormGroup.patchValue(user);
    });
  }

  onSubmit(): void {
    if (this.id) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }
  createUser() {
    this.loading = true;
    const user = this.usersFormGroup.getRawValue() as IUser;

    this.usersService.createUser(user).pipe(
      switchMap(() => this.alertsService.generalSuccess()),
      finalize(() => this.loading = false)
    ).subscribe(() => {
      this.location.back();
    });
  }

  updateUser() {
    this.loading = true;
    const user = this.usersFormGroup.getRawValue() as IUser;

    this.usersService.updateUser(this.id, user).pipe(
      switchMap(() => this.alertsService.generalSuccess()),
      finalize(() => this.loading = false)
    ).subscribe(() => {
      this.location.back();
    });
  }
}

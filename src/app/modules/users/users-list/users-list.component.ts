import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { filter, finalize, take } from 'rxjs';
import { AUTHENTICATION_DATA } from 'src/app/core/const/authentication';
import { SOURCES } from 'src/app/core/const/sources';
import { BaseParams } from 'src/app/core/http/models/base-params.model';
import { UsersService } from 'src/app/core/http/services/users/users.service';
import { IUser } from 'src/app/core/models/users/user.model';
import { AlertService } from 'src/app/core/services/alerts/alert.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  @ViewChild('paginator', { static: false })
  paginator: MatPaginator;

  loading: boolean = false;
  dataSource: MatTableDataSource<IUser> = new MatTableDataSource<IUser>();
  params: BaseParams = {page: 0, perPage: 5};
  columns: string[] = ['name', 'email', 'gender', 'status', 'actions'];

  pageSizeOptions: number[] = [5, 10];
  total: number = 0;
  sourceLogo = SOURCES.innovasystLogoSource;
  username = AUTHENTICATION_DATA.username;

  constructor(private usersService: UsersService,
    private authService: AuthenticationService,
    private alertsService: AlertService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.usersService.getUsers(this.params).pipe(
      finalize(() => this.loading = false),
    ).subscribe((res) => {
      this.dataSource.data = res.result;
      this.total = res.total;
      this.loading = false;
    });
  }

  pageChanged(event: PageEvent) {
    this.params.page = event.pageIndex;
    this.params.perPage = event.pageSize;
    this.getUsers();
  }

  onDeleteUser(id: number) {
    this.alertsService.generalWarning().pipe(
      filter((confirmed: boolean) => confirmed),
      take(1)
    ).subscribe(() => this.deleteUser(id));
  }

  deleteUser(id: number): void {
    this.loading = true;
    this.usersService.deleteUser(id).pipe(
      finalize(() => this.loading = false),
    ).subscribe(() => {
      this.getUsers();
      this.alertsService.generalSuccess();
    });
  }

  logOut(): void {
    this.authService.logOut();
  }
}

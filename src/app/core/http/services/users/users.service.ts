import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/users/user.model';
import { BaseParams } from '../../models/base-params.model';
import { mapPagination } from 'src/app/core/utils/pagination-mapping';
import { PaginatedResult } from '../../models/paginated-result.model';

const routes = {
  users: () => `public/v2/users`,
  user: (id: number) => `public/v2/users/${id}`,
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }


  getUsers(baseParams: BaseParams = {}): Observable<PaginatedResult<IUser[]>> {
    let params = new HttpParams();

    if (baseParams.page !== undefined) {
      params = params.append('page', baseParams.page.toString());
    }
    if (baseParams.perPage) {
      params = params.append('per_page', baseParams.perPage.toString());
    }

    return this.httpClient.get<IUser[]>(routes.users(), { params, observe: 'response' }).pipe(
      mapPagination()
    );
  }

  createUser(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(routes.users(), user);
  }

  getUser(id: number): Observable<IUser> {
    return this.httpClient.get<IUser>(routes.user(id));
  }

  deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(routes.user(id));
  }

  updateUser(id: number, user: IUser): Observable<IUser> {
    return this.httpClient.put<IUser>(routes.user(id), user);
  }
}

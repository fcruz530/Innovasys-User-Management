import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { UsersListComponent } from './modules/users/users-list/users-list.component';
import { UserEditComponent } from './modules/users/user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () =>
      import('src/app/modules/login/login.module').then((m) => m.LoginModule),
  },

  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/users/users.module').then((m) => m.UsersModule),
  },

  {
    path: 'users/:id/edit',
    canActivate: [AuthGuard],
    component: UserEditComponent
  },

  {
    path: 'users/add',
    canActivate: [AuthGuard],
    component: UserEditComponent
  },

  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
    loadChildren: () =>
      import('src/app/modules/page-not-found/page-not-found.module').then((m) => m.PageNotFoundModule),
  },

  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];

export const AppRoutes = RouterModule.forRoot(routes, {
  anchorScrolling: 'enabled',
  bindToComponentInputs: true
});

export class AppRoutingModule { }

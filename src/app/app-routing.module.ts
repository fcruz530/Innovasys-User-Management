import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () =>
      import('src/app/modules/login/login.module').then((m) => m.LoginModule),
  },

  {
    path: 'users',
    component: LoginComponent,
    loadChildren: () =>
      import('src/app/modules/users/users.module').then((m) => m.UsersModule),
  },
];

export const AppRoutes = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,
  anchorScrolling: 'enabled',
  // bindToComponentInputs: true,
});

export class AppRoutingModule { }

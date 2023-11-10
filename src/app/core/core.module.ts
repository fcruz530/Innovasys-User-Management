import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { httpInterceptorProviders } from './http/interceptors';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatDialogModule,
    MatTooltipModule,
    MatSelectModule,
    MatMenuModule
  ],
  exports: [],
  declarations: [],
  providers: [AuthGuard, httpInterceptorProviders],
})
export class CoreModule { }

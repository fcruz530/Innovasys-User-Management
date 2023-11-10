import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../dialogs/alert-dialog/alert-dialog.component';
import { IAlert } from '../../models/alerts/alerts.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public matDialog: MatDialog) { }

  generalError(text?: string): void {
    const alert: IAlert = {
      icon: 'error',
      title: 'Something went wrong!',
      text: text ?? 'For more information please contact your administrator.',
      confirmButtonText: 'Confirm',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
    };

    this.matDialog.open(AlertDialogComponent, { data: alert, width: '30rem' });
  }

  generalSuccess(): Observable<boolean> {
    const alert: IAlert = {
      icon: 'success',
      title: 'Success!',
      text: 'Operation completed succesfully.',
      confirmButtonText: 'Confirm',
      showConfirmButton: true,
      showCancelButton: false,
    };

    return this.matDialog.open(AlertDialogComponent, { data: alert, width: '30rem' }).afterClosed();
  }

  generalWarning(): Observable<boolean> {
    const alert: IAlert = {
      icon: 'warning',
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      confirmButtonText: 'Confirm',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
    };

    return this.matDialog.open(AlertDialogComponent, { data: alert, width: '30rem' }).afterClosed();
  }
}

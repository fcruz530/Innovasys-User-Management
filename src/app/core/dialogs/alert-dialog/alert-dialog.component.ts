import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { IAlert } from '../../models/alerts/alerts.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  templateUrl: './alert-dialog.component.html',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  styleUrls: ['./alert-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogComponent implements OnInit {
  iconColor: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: IAlert) {}

  ngOnInit(): void {
    this.#getIconColor();
  }

  #getIconColor(): void {
    switch (this.data.icon) {
      case 'success':
        this.iconColor = 'primary';
        break;
      case 'error':
        this.iconColor = 'warn';
        break;
      default:
        this.iconColor = 'accent';
        break;
    }
  }
}

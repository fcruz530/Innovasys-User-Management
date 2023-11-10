export type AlertIcon = 'success' | 'error' | 'warning';

export interface IAlert {
  title: string;
  text?: string;
  showConfirmButton?: boolean;
  confirmButtonText?: string;
  confirmButtonColor?: 'primary' | 'accent' | 'warn';
  icon?: AlertIcon;
  showCancelButton?: boolean;
  cancelButtonText?: string;
  cancelButtonColor?: 'primary' | 'accent' | 'warn';
}

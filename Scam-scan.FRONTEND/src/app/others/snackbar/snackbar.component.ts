import { Component, Inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string = '', duration: number = 3000) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: { message },
      duration: duration,
    });
  }
}

@Component({
  selector: 'app-snackbar',
  template: `
    <div class="snackbar-message">{{ data.message }}</div>
  `,
  styles: [`
    .snackbar-message {
      color: white;
      font-size: 16px;
      text-align: center;
    }
  `],
})
export class SnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}

import { Inject, Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  showSnackbar(message: string, action: string = 'Close', duration: number = 3000): void {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  // Exemple d'utilisation
  showSuccess(): void {
    this.showSnackbar('Operation successful!', 'Close', 3000);
  }

  showError(): void {
    this.showSnackbar('An error occurred!', 'Retry', 5000);
  }
}


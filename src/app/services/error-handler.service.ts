import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private snackBar: MatSnackBar) {
  }

  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Dismiss', {duration: 2500});
  }
}

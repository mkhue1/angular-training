import {Component, inject, signal} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {AuthService} from '../../service/auth-service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AddProductSheet} from '../add-product-sheet/add-product-sheet';

export interface Order{
  id: number;
  createdAt: Date;
  price: number;
  status: 'NEW' | 'CONFIRMED' | 'CANCELLED'
}

@Component({
  selector: 'app-order',
  templateUrl: './order.html',
  styleUrl: './order.css',
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  standalone: true
})
export class OrderComponent{
  auth = inject(AuthService);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  orderList = signal<Order[]>([]);

  openSheet(){
    const sheetRef = this.dialog.open(AddProductSheet);
  }

}

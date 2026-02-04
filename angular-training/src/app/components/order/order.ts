import {Component, inject, OnInit, signal} from '@angular/core';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {AuthService} from '../../service/auth-service';
import {OrderService} from '../../service/order-service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {OrderDetailComponent} from '../order-detail/order-detail';

export interface Order{
  id?: number;
  createdAt: string;
  totalAmount: number;
  status?: 'NEW' | 'CONFIRMED' | 'CANCELLED'
}

export interface OrderItem {
  productId: number;
  productName: string;
  subTotal: number;
  quantity: number;
  stock: number;
}

export interface OrderRequest {
  items: {
    productId: number;
    quantity: number;
  }[];
}

@Component({
  selector: 'app-order',
  templateUrl: './order.html',
  styleUrl: './order.css',
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    DatePipe,
    MatDialogModule,
  ],
  standalone: true
})
export class OrderComponent implements  OnInit{
  auth = inject(AuthService);
  orderService = inject(OrderService);
  snackBar = inject(MatSnackBar);
  dialog = inject(MatDialog);
  orders = signal<Order[]>([]);

  ngOnInit() {
    this.orderService.getOrders().subscribe(data => {
      this.orders.set(data);
    });
  }

  deleteProduct(id: number){
    this.orderService.deleteProduct(id).subscribe(() => {
      this.orders.update(list =>
        list.filter(todo => todo.id !== id)
      );
      this.snackBar.open(
        'Delete successfully ✅',
        'OK',
        { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' }
      );
    });
  }

  openDetail(orderId: number) {
    this.dialog.open(OrderDetailComponent, {
      width: '700px',
      data: orderId
    });
  }
}

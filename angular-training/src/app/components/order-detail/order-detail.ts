import {Component, inject, OnInit, signal} from '@angular/core';
import {OrderDetail, OrderService} from '../../service/order-service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-order-detail',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
  standalone: true,
})
export class OrderDetailComponent implements OnInit {
  order = signal<OrderDetail | null>(null);
  orderId = inject(MAT_DIALOG_DATA) as number;
  orderService = inject(OrderService);

  ngOnInit() {
    this.orderService.getOrderDetail(this.orderId).subscribe(res => {
      console.log(res)
      this.order.set(res);
    });
  }
}

import {Component, computed, inject} from '@angular/core';
import {OrderService} from '../../service/order-service';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {OrderRequest} from '../order/order';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, FormsModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  standalone: true,
})
export class Cart {
  orderService = inject(OrderService);
  router = inject(Router);
  cart = this.orderService.cart;
  total = computed(() => this.orderService.getTotalPrice());

  increase(item: any) {
    this.cart.update(list =>
      list.map(i =>
        i === item
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  }

  decrease(item: any) {
    if (item.quantity <= 0) return;

    this.cart.update(list =>
      list.map(i =>
        i === item
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
        .filter(i => i.quantity > 0)
    );
  }

  submitOrder() {
    const payload: OrderRequest = {
      items: this.cart().map(item => ({
        productId: item.productId,
        quantity: item.quantity
      }))
    };
    this.orderService.createOrder(payload).subscribe({
      next: () => {
        this.orderService.clearCart();
        this.router.navigate(["/order"])
      },
      error: err => alert(err.error.message)
    });
  }
}

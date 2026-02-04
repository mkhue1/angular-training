import {inject, Injectable, signal} from '@angular/core';
import {Product} from '../components/product/product';
import {Order, OrderItem} from '../components/order/order';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface OrderDetail {
  id: number;
  totalAmount: number;
  status: 'NEW' | 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
  items: OrderItemDetail[];
}

export interface OrderItemDetail {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}


@Injectable({
  providedIn: 'root',
})
export class OrderService {
  http = inject(HttpClient);
  snackBar = inject(MatSnackBar);
  cart = signal<OrderItem[]>([]);
  private  orderURL = "http://localhost:8080/order"
  createOrder(payload: any) {
    return this.http.post<Order>(this.orderURL, payload);
  }

  getOrders() {
    return this.http.get<Order[]>(this.orderURL);
  }

  getOrderDetail(orderId: number){
    return this.http.get<OrderDetail>(`${this.orderURL}/${orderId}`);
  }

  addToCart(product: Product) {
    if (this.availableStock(product) <= 0) {
      this.snackBar.open('Sản phẩm đã hết hàng', 'OK', { duration: 2000 });
      return;
    }
    this.cart.update(items => {
      const existing = items.find(i => i.productId === product.id);

      if (existing) {
        return items.map(i =>
          i.productId === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [
        ...items,
        {
          productId: product.id!,
          productName: product.productName,
          subTotal: product.price,
          quantity: 1,
          stock: product.quantity,
        }
      ];
    });
  }

  clearCart(){
    this.cart.set([]);
  }

  getTotalPrice() {
    return this.cart().reduce(
      (sum, i) => sum + i.subTotal * i.quantity,
      0
    );
  }

  deleteProduct(id : number): Observable<void>{
    return this.http.delete<void>(`${this.orderURL}/${id}`)
  }

  availableStock(product: Product): number {
    const inCart =
      this.cart().find(i => i.productId === product.id)?.quantity ?? 0;

    return product.quantity - inCart;
  }

}

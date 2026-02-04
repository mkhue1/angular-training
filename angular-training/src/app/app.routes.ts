import { Routes } from '@angular/router';
import {authGuard} from './auth-guard';

export const routes: Routes = [
    {
      path: "product",
      loadComponent: () => import ('./components/product/product').then(m=>m.ProductComponent),
      canActivate: [authGuard]
    },
    {
      path: "order",
      loadComponent: () => import ('./components/order/order').then(m=>m.OrderComponent),
      canActivate: [authGuard]
    },
    {
      path: "cart",
      loadComponent: () => import ('./components/cart/cart').then(m=>m.Cart),
      canActivate: [authGuard]
    },
];

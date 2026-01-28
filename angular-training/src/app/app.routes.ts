import { Routes } from '@angular/router';
import {authGuard} from './auth-guard';

export const routes: Routes = [
    {
        path: "todo",
        loadComponent: () => import ('./components/todo/todo').then(m=>m.TodoComponent),
        canActivate: [authGuard]
    },
    {
      path: "product",
      loadComponent: () => import ('./components/product/product').then(m=>m.ProductComponent),
      canActivate: [authGuard]
    },
];

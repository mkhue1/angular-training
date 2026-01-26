import { Routes } from '@angular/router';
import {authGuard} from './auth-guard';

export const routes: Routes = [
    {
        path: "train",
        loadComponent: () => import('./components/train/train').then(m=>m.TrainComponent),
        canActivate: [authGuard]
    },
    {
        path: "todo",
        loadComponent: () => import ('./components/todo/todo').then(m=>m.TodoComponent),
        canActivate: [authGuard]
    }
];

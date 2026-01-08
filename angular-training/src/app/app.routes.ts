import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "train",
        loadComponent: () => import('./components/train/train').then(m=>m.TrainComponent)
    },
    {
        path: "todo",
        loadComponent: () => import ('./components/todo/todo').then(m=>m.TodoComponent)
    }
];

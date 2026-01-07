import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "train",
        loadComponent: () => import('./train').then(m=>m.TrainComponent)
    },
    {
        path: "todo",
        loadComponent: () => import ('./todo').then(m=>m.TodoComponent)
    }
];

import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "train",
        loadComponent: () => import('./train').then(m=>m.TrainComponent)
    }
];

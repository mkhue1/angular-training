import { Component, signal } from '@angular/core';
import { TrainComponent } from './train';

@Component({
  selector: 'app-root',
  imports: [TrainComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}


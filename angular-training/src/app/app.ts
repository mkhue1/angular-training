import { Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    MatListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  loggedIn = signal(false);
  constructor(private router: Router) {}
  navigateTodo() {
    this.router.navigate(['/todo'])
  }
  navigateTrain(){
    this.router.navigate(['/train'])
  }
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    passWord : new FormControl('', Validators.required)
  });
  login(){
    if(this.loginForm.invalid) return;
    this.loggedIn.set(true);
  }
}


import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {ReactiveFormsModule, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './service/auth-service';


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

  private router = inject(Router);
  private http = inject(HttpClient);
  private auth = inject(AuthService)
  loggedIn = this.auth.loggedIn;
  registered = false
  navigateRegister(){
    this.registered = true
    this.loginForm.reset();
    this.registerForm.reset();
  }
  navigateLogIn(){
    this.registered = false
    this.loginForm.reset();
    this.registerForm.reset();
  }
  navigateTodo() {
    this.router.navigate(["/todo"])
  }
  navigateShop(){
    this.router.navigate(["/product"])
  }
  navigateOrder(){
    this.router.navigate(["/order"])
  }
  navigateCart(){
    this.router.navigate(["/cart"])
  }
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password : new FormControl('', Validators.required)
  });
  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
  });

  register(){
    if (this.registerForm.invalid) return;

    const { username, password } = this.registerForm.value;

    this.http.post<any>('http://localhost:8080/auth/register', {
      username: username,
      password: password
    }).subscribe({
      next: res => {
        this.auth.setToken(res.accessToken);
        this.router.navigate(["/todo"])
      },
      error: err => alert(err.error)
    });
  }

  login() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;

    this.http.post<any>('http://localhost:8080/auth/login', {
      username: username,
      password: password
    }).subscribe({
      next: res => {
        this.auth.setToken(res.accessToken);
        this.loggedIn.set(true);
        this.router.navigate(["/todo"])
      },
      error: () => alert('Login failed')
    });
  }

  logout() {
    this.auth.logout();
    this.registered = false
    this.loginForm.reset();
    this.registerForm.reset();
  }

}


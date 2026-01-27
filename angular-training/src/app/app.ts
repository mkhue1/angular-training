import { Component, inject, signal } from '@angular/core';
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
  }
  navigateTodo() {
    this.router.navigate(["/todo"])
  }
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    passWord : new FormControl('', Validators.required)
  });
  registerForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    passWord : new FormControl('', Validators.required),
  });
  register(){
    if (this.registerForm.invalid) return;

    const { userName, passWord } = this.registerForm.value;

    this.http.post<any>('http://localhost:8080/auth/register', {
      username: userName,
      password: passWord
    }).subscribe({
      next: res => {
        this.auth.setToken(res.accessToken);
        this.router.navigate(["/todo"])
      },
      error: () => alert('Register failed')
    });
  }
  login() {
    if (this.loginForm.invalid) return;

    const { userName, passWord } = this.loginForm.value;

    this.http.post<any>('http://localhost:8080/auth/login', {
      username: userName,
      password: passWord
    }).subscribe({
      next: res => {
        this.auth.setToken(res.accessToken);
        this.router.navigate(["/todo"])
      },
      error: () => alert('Login failed')
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

}


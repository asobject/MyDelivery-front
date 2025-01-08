import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './_services/auth/auth.service';
import { UserService } from './_services/user/user.service';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgIf,CommonModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'MyDelivery';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService,public userService:UserService,private router:Router) {
  }
  ngOnInit(): void {
    this.authService.refreshRequest();
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

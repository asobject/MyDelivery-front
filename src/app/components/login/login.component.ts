import { Component,OnInit } from '@angular/core';
import { FormControl,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { AuthService } from '../../_services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../_services/storage/storage.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  b:boolean|null = null;
  constructor(private authService:AuthService,private storageService:StorageService,private router:Router) {
    this.loginForm = new FormGroup({
     email: new FormControl(null,[Validators.required,Validators.email]),
     password: new FormControl(null,[Validators.required,Validators.minLength(6)])
     });
  }
  ngOnInit(): void {
  }
  submit():void{
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.login(email, password);
    } else {
      console.error('Форма недействительна');
    }
  }
  login(email:string, password:string):void {
    this.authService.login({ email, password }).subscribe(
      response => {
        this.storageService.setAccessToken(response.accessToken);
        this.router.navigate(['/']);
      },
      error => {
        
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
}

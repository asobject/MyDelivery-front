import { Component,OnInit } from '@angular/core';
import { FormControl,FormGroup,FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  login:FormGroup;
  b:boolean|null = null;
  constructor(){
    this.login = new FormGroup({
     email: new FormControl(null,[Validators.required,Validators.email]),
     password: new FormControl(null,[Validators.required,Validators.minLength(6)])
     });
  }
  ngOnInit(): void {
  }
  submit(){
    console.log(this.login.controls['email'].value);
    console.log(this.login.controls['password'].value);
  }
}

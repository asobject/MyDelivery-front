
import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators,ReactiveFormsModule,FormsModule, AbstractControl } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
   register: FormGroup;
  constructor(private builder:FormBuilder) {
    this.register = this.builder.group({
      firstName: new FormControl(null, Validators.required),
      //phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^\\+[0-9]{1,3}[-. ]?[0-9]{1,14}$')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null,[Validators.required, Validators.minLength(6)])
    })}
  ngOnInit():void{}
 
  submit(){
    console.log(this.register.value);
  }
}

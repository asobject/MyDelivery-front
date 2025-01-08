
import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup,Validators,ReactiveFormsModule,FormsModule, AbstractControl } from '@angular/forms';
import { NgClass } from '@angular/common';
import { AuthService } from '../../_services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: []
})
export class RegisterComponent implements OnInit {
   registerForm: FormGroup;
  constructor(private builder:FormBuilder,private authService:AuthService,private router:Router) { 
    this.registerForm = this.builder.group({
      firstName: new FormControl(null, Validators.required),
      //phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^\\+[0-9]{1,3}[-. ]?[0-9]{1,14}$')]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null,[Validators.required, Validators.minLength(6)])
    })}
  ngOnInit():void{}
  private passwordsMatch(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  submit(): void {
    if (this.registerForm.valid) {
      const { firstName, email, password } = this.registerForm.value;
      this.register(firstName, email, password);
    } else {
      console.error('Форма недействительна');
    }
  }
  register(firstName:string,email:string,password:string): void {
    this.authService.register({ firstName, email, password }).subscribe(
      response => {
        console.log('Регистрация успешна!', response.message);
        this.router.navigate(['/login']); 
      },
      error => {
        
      });
  }
}

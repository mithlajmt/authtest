import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loading:LoadingService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required,Validators.minLength(0)]],
    });
  }


  ngOnInit(): void {
    const user = navigator.userAgent
  }

 

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading.show() // Show loading spinner
      // Handle login logic here
    const user = {
      ...this.loginForm.value,
      username: this.loginForm.value.username.trim(),
      device:'web',
      social_auth:1

    }
    this.authService.userlogin(user).subscribe({
      next: (response:any) => {
        console.log('Login successful:', response);
        this.loading.hide(); // Hide loading spinner
        localStorage.setItem('authToken', response.user.token);
        this.router.navigate(['/user/courses']);

      },
      error: (error) => {
        console.error('Error logging in:', error);
        alert('Login failed');
      }
    })
    }
  }
}

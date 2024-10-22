import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      remember_me: [false]
    });
  }


  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      // Handle login logic here
    const user = {
      ...this.loginForm.value
    }

    }
  }
}

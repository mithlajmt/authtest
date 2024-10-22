import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authserv:AuthService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      user_type: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // Trim inputs to avoid leading/trailing spaces before submission
      const formData = {
        ...this.registerForm.value,
        name: this.registerForm.value.name.trim(),
        email: this.registerForm.value.email.trim(),
        mobile: this.registerForm.value.mobile.trim(),
        device:'mobile',

      };
        this.authserv.registerUser(formData).subscribe({
          next: (response) => {
            console.log('Registration successful:', response);
          },
          error: (error) => {
            console.error('Error registering user:', error);
          }
        }) 
     }
  }
}

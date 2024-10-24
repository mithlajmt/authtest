import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))
      ])
    ])
  ]
  
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authserv:AuthService,
    private router:Router,
    private loading:LoadingService,
    private toastr: ToastrService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      user_type: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.registerForm.valueChanges.subscribe(() => {
      this.getFormProgress();
    });
  }

  getFormProgress(): number {
    const controls = Object.keys(this.registerForm.controls);
    const totalControls = controls.length;
    const validControls = controls.filter(key => this.registerForm.get(key)?.valid).length;
    return (validControls / totalControls) * 100;
  }

  setUserType(type: string): void {
    this.registerForm.patchValue({
      user_type: type
    });
  }

  navigate(){
    this.router.navigate(['auth/login']);
  }

  onSubmit() {
    this.loading.show(); // Show loading spinner
    if (this.registerForm.valid) {


      // Trim inputs to avoid leading/trailing spaces before submission
      const formData = {
        ...this.registerForm.value,
        name: this.registerForm.value.name.trim(),
        email: this.registerForm.value.email.trim(),
        mobile: this.registerForm.value.mobile.trim(),
        device:navigator.userAgent

      };
        this.authserv.registerUser(formData).subscribe({
          next: (response) => {
            console.log('Registration successful:', response);
            this.router.navigate(['auth/login']);
            this.loading.hide(); // Hide loading spinner
            this.toastr.success('Registration Successful', 'Success');
          },
          error: (error) => {
            console.error('Error registering user:', error);
            this.loading.hide(); // Hide loading spinner
            this.toastr.error('Registration Failer', 'Error');
            alert('Registration failed')
          }
        }) 
     }
  }
}

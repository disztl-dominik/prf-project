import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private location: Location, private authService: AuthService) {

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: [''],
      tel: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['']
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (control.value === matchingControl.value) {
        matchingControl.setErrors(null);
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit() {
    console.log('Form data:', this.registerForm.value);
    if (this.registerForm.valid) {
      console.log('Form data:', this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigateByUrl('/login');
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Form is not valid.');
    }
  }

  navigate(to: string) {
    console.log("navigate");
    this.router.navigateByUrl(to);
  }
}

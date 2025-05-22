import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../shared/model/User';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Request } from 'express';
import { User as UserModel } from '../../model/User';
import { HeartRate } from '../shared/model/HeartRate';
import { BloodPressure } from '../shared/model/BloodPressure';
import { BloodSugar } from '../shared/model/BloodSugar';
import { Weight } from '../shared/model/Weight';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {
  users?: User[];
  username = "";
  currentUserId = "";
  doctor?: User;
  heartRates?: HeartRate[];
  heartRateForm!: FormGroup;
  bloodPressures?: BloodPressure[];
  bloodPressureForm!: FormGroup;
  bloodSugars?: BloodSugar[];
  bloodSugarForm!: FormGroup;
  weights?: Weight[];
  weightForm!: FormGroup;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  reloadComponent() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  deleteUser(id: string) {
    this.userService.delete(id).subscribe({
      next: (data) => {
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
      }, error: (err) => {
        console.log(err);
      }
    });

    this.userService.getUser().subscribe({
      next: (data) => {
        if (data) {
          this.currentUserId = data;

          this.userService.getDoctor().subscribe({
            next: (data) => {
              console.log("doctor: ", data);
              this.doctor = data as User;
            }, error: (err) => {
              console.log(err);
            }
          });

          console.log("data: ", data);
        }
      },
      error: (err) => console.error('Not authenticated', err),
    });

    this.userService.getUserData().subscribe({
      next: (data) => {
        if (data) {
          this.username = data.name as string;
        }
      },
      error: (err) => console.error('Not authenticated', err),
    });

    // Mérések lekérése
    this.userService.getHeartRates().subscribe({
      next: (data) => {
        this.heartRates = data;
      }, error: (err) => {
        console.log(err);
      }
    });

    this.userService.getBloodPressures().subscribe({
      next: (data) => {
        this.bloodPressures = data;
      }, error: (err) => {
        console.log(err);
      }
    });

    this.userService.getBloodSugars().subscribe({
      next: (data) => {
        this.bloodSugars = data;
      }, error: (err) => {
        console.log(err);
      }
    });

    this.userService.getWeights().subscribe({
      next: (data) => {
        this.weights = data;
      }, error: (err) => {
        console.log(err);
      }
    });

    this.heartRateForm = this.formBuilder.group({
      heartRate: ['', [Validators.required]],
    });
    this.bloodPressureForm = this.formBuilder.group({
      bloodPressure: ['', [Validators.required]],
    });
    this.bloodSugarForm = this.formBuilder.group({
      bloodSugar: ['', [Validators.required]],
    });
    this.weightForm = this.formBuilder.group({
      weight: ['', [Validators.required]],
    });
  }

  recordHeartRate() {
    if (this.heartRateForm.valid) {
      this.userService.recordHeartRate(this.heartRateForm.controls.heartRate?.value as number).subscribe({
        next: (data) => {
          this.reloadComponent();
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Form is not valid.');
    }
  }

  recordBloodPressure() {
    if (this.bloodPressureForm.valid) {
      this.userService.recordBloodPressure(this.bloodPressureForm.controls.bloodPressure?.value).subscribe({
        next: (data) => {
          this.reloadComponent();
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Form is not valid.');
    }
  }

  recordBloodSugar() {
    if (this.bloodSugarForm.valid) {
      this.userService.recordBloodSugar(this.bloodSugarForm.controls.bloodSugar?.value).subscribe({
        next: (data) => {
          this.reloadComponent();
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Form is not valid.');
    }
  }

  recordWeight() {
    if (this.weightForm.valid) {
      this.userService.recordWeight(this.weightForm.controls.weight?.value).subscribe({
        next: (data) => {
          this.reloadComponent();
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Form is not valid.');
    }
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }

  logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/login');
      }, error: (err) => {
        console.log(err);
      }
    })
  }
}
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../shared/model/User';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './doctor-management.component.html',
  styleUrl: './doctor-management.component.scss'
})
export class DoctorManagementComponent {
  username = "";
  patients?: User[];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router  
  ) { }

  ngOnInit() {
    this.userService.getUserData().subscribe({
      next: (data) => {
        if (data) {
          this.username = data.name as string;
        }
      },
      error: (err) => console.error('Not authenticated', err),
    });

    this.userService.getPatients().subscribe({
      next: (data) => {
        if (data) {
          this.patients = data;
        }
      },
      error: (err) => console.error('Not authenticated', err),
    });
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
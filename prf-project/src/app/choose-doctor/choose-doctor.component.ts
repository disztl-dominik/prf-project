import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../shared/model/User';
import { UserService } from '../shared/services/user.service';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { Request } from 'express';
import { User as UserModel } from '../../model/User';
import { MatIconModule } from '@angular/material/icon'

@Component({
  selector: 'app-choose-doctor',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './choose-doctor.component.html',
  styleUrl: './choose-doctor.component.scss'
})
export class ChooseDoctorComponent {
  doctors?: User[];
  currentUserId = "";

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private location: Location,
    private router: Router  
  ) { }

  ngOnInit() {
    this.userService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        console.log(this.doctors[0]._id);
      }, error: (err) => {
        console.log(err);
      }
    });

    this.userService.getUser().subscribe({
      next: (data) => {
        if (data) {
          this.currentUserId = data;
          console.log("data: ", data);
        }
      },
      error: (err) => console.error('Not authenticated', err),
    });
  }

  chooseDoctor(id: string) {
    this.userService.setDoctor(id).subscribe({
      next: (data) => {
        if (data) {
          console.log("done");
          this.goBack();
        }
      },
      error: (err) => console.error('Error', err),
    });
  }

  goBack() {
    this.location.back();
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
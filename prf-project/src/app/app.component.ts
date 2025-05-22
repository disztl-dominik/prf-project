import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { PatientsComponent } from "./patients/patients.component";
import { UserManagementComponent } from './user-management/user-management.component';
import { DoctorManagementComponent } from './doctor-management/doctor-management.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, RegisterComponent, ProfileComponent, PatientsComponent, UserManagementComponent, DoctorManagementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'prf-project';
}

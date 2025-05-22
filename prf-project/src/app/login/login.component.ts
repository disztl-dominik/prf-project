import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { User } from '../shared/model/User';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email?: string;
  password?: string;
  errorMessage: string = '';
  isLoading = false;

  constructor(private router: Router, private authService: AuthService) {

  }

  navigate(to: string) {
    console.log("navigate");
    this.router.navigateByUrl(to);
  }

  login() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.email && this.password) {
        this.errorMessage = '';
        this.authService.login(this.email, this.password).subscribe({
          next: (data) => {
            if (data) {
              // navigation
              const user = data as User;
              console.log("data: " + data);
              this.isLoading = false;
              console.log(user.role);
              if (user.role == "doctor") {
                this.router.navigateByUrl('/doctor-management');
              } else {
                this.router.navigateByUrl('/user-management');
              }
            }
          }, error: (err) => {
            console.log(err);
            this.isLoading = false;
          },
        })
      } else {
        this.isLoading = false;
        this.errorMessage = 'Form is empty.';
      }
    }, 1500);
  }
}

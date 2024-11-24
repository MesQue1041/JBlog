import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';  // Ensure you have the MessageService imported

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']  // Corrected from 'styleUrl' to 'styleUrls'
})
export class LoginComponent {

  constructor(private apiService: ApiService,
    private message: MessageService,
    private router: Router
  ) {}

  userLogin(login: NgForm) {
    if (login.invalid) {
      return;
    }

    const loginData = { email: login.value.email, password: login.value.password };

    // API service for authentication
    this.apiService.login(loginData.email, loginData.password).subscribe(
      (res) => {
        if (res.user.roles === 'Admin' && res.success) {
          this.message.add({
            severity: 'info',
            summary: 'Success',
            detail: 'Authentication Successful',
            life: 1500
          });

          setTimeout(() => {
            this.router.navigateByUrl('/').then();
          }, 1500);
        } else {
          this.message.add({
            severity: 'error',
            summary: 'Failed Attempt',
            detail: 'You are not authorised to view this page',
            life: 1500
          });
        }
      },
      (err: HttpErrorResponse) => {
        this.message.add({
          severity: 'error',
          summary: `Failed ${err.status}`, // Corrected string interpolation
          detail: `${err.statusText}`,  // Corrected string interpolation
          life: 1500
        });
      }
    );
  }
}

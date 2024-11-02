import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {

  }
  onLogin(): void {
    this.authService.login("test", "12345").subscribe(
      res => {
        this.router.navigate(['/'])
      }
    );
  }
}

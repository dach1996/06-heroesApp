import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth-service.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  constructor(
    private readonly authService: AuthService,
    private readonly route: Router,
  ) {

  }

  public sidebarItems = [
    {
      label: 'Listado', icon: 'label', url: './list'
    },
    {
      label: 'Añadir', icon: 'add', url: './new-hero'
    },
    {
      label: 'Buscar', icon: 'search', url: './search'
    }
  ]
  onLogout() {
    this.authService.logout()
    this.route.navigate(['/auth'])
  }

  get User(): User | undefined {
    return this.authService.CurrentUser;
  }
}

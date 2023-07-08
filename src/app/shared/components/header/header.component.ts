import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  router = inject(Router);
  authService = inject(AuthService);
  isSideBarOpen = signal(false);

  currentPath$ = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => this.router.url.split('/').pop())
  );
  currentPath = toSignal(this.currentPath$);

  logout() {
    this.authService.logout();
  }

  handleSelect() {
    this.isSideBarOpen.update((value) => !value);
  }
}

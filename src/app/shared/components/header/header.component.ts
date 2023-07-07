import { Component, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter, map, take, tap } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  router = inject(Router);
  authService = inject(AuthService);
  isSideBarOpen = false;

  currentPath$ = this.router.events.pipe(
    takeUntilDestroyed(),
    filter((event) => event instanceof NavigationEnd),
    map(() => this.router.url.split('/').pop())
  );
  currentPath = toSignal(this.currentPath$);

  logout() {
    this.authService.logout();
  }

  handleSelect() {
    this.isSideBarOpen = !this.isSideBarOpen;
  }
}

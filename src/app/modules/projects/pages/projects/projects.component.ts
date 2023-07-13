import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { TileComponent } from 'src/app/shared/components/tile/tile.component';

@Component({
  imports: [CommonModule, TileComponent],
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  standalone: true,
})
export class ProjectsComponent {
  authServices = inject(AuthService);

  projects = computed<any[]>(() => this.authServices.currentUser().projects);
}
